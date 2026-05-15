// -----
// controllers/albumListController.js
// -----

const AlbumList = require('../models/albumListModel');
const User = require('../models/userModel');
const Album = require('../models/albumModel');

const jwt = require('jsonwebtoken');

// -----

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// -----

// Resolve o utilizador autenticado.
function resolveAuthenticatedUserId(req) {
  if (req.token) {
    try {
      const payload = jwt.verify(req.token, JWT_SECRET);
      return payload.sub;
    } catch (error) {
      return null;
    }
  }

  return req.get('x-user-id') || null;
}

// -----

// Criar uma lista personalizada de álbuns para o utilizador autenticado.
exports.create = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const { name } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : '';

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: 'List name is required.'
      });
    }

    if (normalizedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'List name must have at most 100 characters.'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const existingList = await AlbumList.findOne({
      user: userId,
      name: normalizedName
    });

    if (existingList) {
      return res.status(409).json({
        success: false,
        message: 'You already have an album list with that name.'
      });
    }

    const albumList = new AlbumList({
      name: normalizedName,
      user: userId,
      albums: []
    });

    await albumList.save();

    user.albumLists.push(albumList._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Album list created successfully.',
      albumList
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You already have an album list with that name.'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(e => e.message).join(' ')
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating the album list.'
    });
  }
};

// -----

// Adicionar um álbum a uma lista personalizada do utilizador autenticado.
exports.addAlbum = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const { listId } = req.params;
    const { albumId } = req.body;

    if (!albumId) {
      return res.status(400).json({
        success: false,
        message: 'albumId is required.'
      });
    }

    const albumList = await AlbumList.findOne({
      _id: listId,
      user: userId
    });

    if (!albumList) {
      return res.status(404).json({
        success: false,
        message: 'Album list not found.'
      });
    }

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Album not found.'
      });
    }

    const alreadyInList = albumList.albums.some(
      (item) => item.album.toString() === albumId
    );

    if (alreadyInList) {
      return res.status(409).json({
        success: false,
        message: 'This album is already in this list.'
      });
    }

    albumList.albums.push({
      album: albumId,
      addedAt: Date.now()
    });

    await albumList.save();
    await albumList.populate('albums.album', 'mbdi title releaseYear type imageUrl artist');

    res.status(201).json({
      success: true,
      message: 'Album added to the list successfully.',
      albumList
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding the album to the list.'
    });
  }
};

// -----
