// -----
// controllers/albumCollectionController.js
// -----

// Para usar os modelos definidos em Mongoose.
const AlbumCollection = require('../models/albumCollectionModel');
const Version = require('../models/versionModel');

// Para validar JSON Web Tokens.
const jwt = require('jsonwebtoken');

// -----

// Chave usada na validacao de JSON Web Tokens.
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

// Obter a coleção de álbuns do utilizador autenticado.
exports.getMyCollection = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    let collection = await AlbumCollection.findOne({ user: userId })
      .populate({
        path: 'versions',
        populate: {
          path: 'physicalSupport',
          populate: {
            path: 'album',
            populate: {
              path: 'artist',
              select: 'isni name imageUrl type'
            }
          }
        }
      });

    if (!collection) {
      return res.status(200).json({
        success: true,
        message: 'The user does not have an album collection yet.',
        collection: { user: userId, versions: [] }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Album collection retrieved successfully.',
      collection
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching the album collection.'
    });
  }
};

// Adicionar uma versão à coleção do utilizador autenticado.
exports.addVersion = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const { versionId } = req.body;

    if (!versionId) {
      return res.status(400).json({
        success: false,
        message: 'versionId is required.'
      });
    }

    // Verificar se a versão existe.
    const version = await Version.findById(versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: 'Version not found.'
      });
    }

    // Obter ou criar a coleção do utilizador.
    let collection = await AlbumCollection.findOne({ user: userId });

    if (!collection) {
      collection = new AlbumCollection({ user: userId, versions: [] });
    }

    // Verificar se a versão já está na coleção.
    const alreadyOwned = collection.versions.some(
      (existingVersionId) => existingVersionId.toString() === versionId
    );

    if (alreadyOwned) {
      return res.status(409).json({
        success: false,
        message: 'This version is already in your collection.'
      });
    }

    collection.versions.push(versionId);
    await collection.save();

    // Populate para devolver dados completos na resposta.
    await collection.populate({
      path: 'versions',
      populate: {
        path: 'physicalSupport',
        populate: {
          path: 'album',
          populate: {
            path: 'artist',
            select: 'isni name imageUrl type'
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Version added to your collection successfully.',
      collection
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding a version to the collection.'
    });
  }
};

// Remover uma versão da coleção do utilizador autenticado.
exports.removeVersion = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const { versionId } = req.params;

    const collection = await AlbumCollection.findOne({ user: userId });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Album collection not found.'
      });
    }

    const versionIndex = collection.versions.findIndex(
      (existingVersionId) => existingVersionId.toString() === versionId
    );

    if (versionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'This version is not in your collection.'
      });
    }

    collection.versions.splice(versionIndex, 1);
    await collection.save();

    res.status(200).json({
      success: true,
      message: 'Version removed from your collection successfully.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing a version from the collection.'
    });
  }
};

// -----
