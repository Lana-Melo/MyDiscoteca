// -----
// controllers/notificationController.js
// -----

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

// List notifications for the authenticated user (US14).
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Notifications retrieved successfully.',
      message: 'Notifications retrieved successfully.',
      notifications: notifications.map(n => ({
        _id: n._id,
        albumTitle: n.albumTitle,
        designation: n.designation,
        status: n.status,
        seen: n.seen,
        createdAt: n.createdAt
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving notifications.'
    });
  }
};

// -----

// Mark all notifications for the authenticated user as seen (US14).
exports.markAsSeen = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }

    await Notification.updateMany(
      { user: userId, seen: false },
      { seen: true }
    );

    res.status(200).json({
      success: true,
      message: 'Notifications marked as seen.'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating notifications.'
    });
  }
};

// -----