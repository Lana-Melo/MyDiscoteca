// -----
// controllers/contributionController.js
// -----

const Contribution = require('../models/contributionModel');
const Album = require('../models/albumModel');
const Notification = require('../models/notificationModel');
const jwt = require('jsonwebtoken');

// -----

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// -----

function resolveAuthenticatedUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const payload = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    return payload.sub;
  } catch {
    return null;
  }
}

// -----

exports.createContribution = async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    await newContribution.save();
    res.status(201).json({ success: true, contribution: newContribution });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'The EAN-13 code is already in use by another submission.'
      });
    }
    res.status(500).json({ success: false, message: 'Error saving contribution.' });
  }
};

// Submit a new album version request (US12).
exports.submitAlbumVersionRequest = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }

    const { albumId, eanCode, physicalSupport, designation } = req.body;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Album not found.'
      });
    }

    const newContribution = new Contribution({
      user: userId,
      album: albumId,
      eanCode: eanCode?.trim(),
      physicalSupport,
      designation: designation?.trim() || null,
      status: 'Pending'
    });

    await newContribution.save();

    res.status(201).json({
      _id: newContribution._id,
      albumId: newContribution.album,
      eanCode: newContribution.eanCode,
      physicalSupport: newContribution.physicalSupport,
      designation: newContribution.designation,
      status: newContribution.status,
      createdAt: newContribution.createdAt
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(e => e.message).join(' ')
      });
    }
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting the contribution request.'
    });
  }
};

// -----

// List contribution requests for the authenticated user (US13).
exports.getMyRequests = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }

    // Optional filter by status (?status=Pending | Accepted | Rejected).
    const { status } = req.query;

    const filter = { user: userId };
    if (status) {
      const allowedStatuses = ['Pending', 'Accepted', 'Rejected'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed values are: "Pending", "Accepted", "Rejected".'
        });
      }
      filter.status = status;
    }

    const contributions = await Contribution.find(filter)
      .populate('album', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'User requests retrieved successfully.',
      message: 'User requests retrieved successfully.',
      contributions: contributions.map(c => ({
        _id: c._id,
        albumId: c.album?._id,
        albumTitle: c.album?.title ?? 'Unknown album',
        albumTitle: c.album?.title ?? 'Unknown album',
        eanCode: c.eanCode,
        physicalSupport: c.physicalSupport,
        designation: c.designation,
        status: c.status,
        createdAt: c.createdAt
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving contribution requests.'
    });
  }
};

// -----

// Simulate a response to a request (accepted/rejected) — assignment footnote 12.
// Route: POST /api/contributions/album-version/:id/respond
// Body: { "status": "Accepted" | "Rejected" }
exports.respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Accepted', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values are: "Accepted" or "Rejected".'
      });
    }

    const contribution = await Contribution.findById(id)
      .populate('album');

    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Contribution request not found.'
      });
    }

    if (contribution.status !== 'Pending') {
      return res.status(409).json({
        success: false,
        message: 'This request has already been responded to.'
      });
    }

    contribution.status = status;
    await contribution.save();

    // Create notification for the user who submitted the request (US14).
    // Create notification for the user who submitted the request (US14).
    await Notification.create({
      user: contribution.user,
      contribution: contribution._id,
      albumTitle: contribution.album?.title ?? 'Unknown album',
      albumTitle: contribution.album?.title ?? 'Unknown album',
      designation: contribution.designation,
      status
    });

    // If accepted, create the version on the album (US14c).
    if (status === 'Accepted') {
      const PhysicalSupport = require('../models/physicalSupportModel');
      const Version = require('../models/versionModel');

      let physicalSupport = await PhysicalSupport.findOne({
        album: contribution.album._id,
        type: contribution.physicalSupport
      });

      if (!physicalSupport) {
        physicalSupport = new PhysicalSupport({
          type: contribution.physicalSupport,
          album: contribution.album._id
        });
        await physicalSupport.save();

        await Album.findByIdAndUpdate(
          contribution.album._id,
          { $push: { physicalSupports: physicalSupport._id } }
        );
      }

      const newVersion = new Version({
        eanCode: contribution.eanCode,
        designation: contribution.designation || 'Standard Edition',
        physicalSupport: physicalSupport._id
      });
      await newVersion.save();

      await PhysicalSupport.findByIdAndUpdate(
        physicalSupport._id,
        { $push: { versions: newVersion._id } }
      );
    }

    res.status(200).json({
      success: true,
      message: `Request marked as "${status}".`,
      message: `Request marked as "${status}".`,
      contribution: {
        _id: contribution._id,
        status: contribution.status,
        updatedAt: contribution.updatedAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while responding to the contribution request.'
    });
  }
};

// -----