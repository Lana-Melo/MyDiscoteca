// -----
// controllers/notificationController.js
// -----

// Para usar os modelos definidos em Mongoose.
const Notification = require('../models/notificationModel');

// Para validar JSON Web Tokens.
const jwt = require('jsonwebtoken');

// -----

// Chave usada na validacao de JSON Web Tokens.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// -----

// Resolve o id do utilizador autenticado a partir do bearer token.
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

// Listar as notificações do utilizador autenticado (US14).
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilizador não autenticado.'
      });
    }

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
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
      message: 'Server error while fetching notifications.'
    });
  }
};

// -----

// Marcar todas as notificações do utilizador autenticado como vistas (US14).
exports.markAsSeen = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilizador não autenticado.'
      });
    }

    await Notification.updateMany(
      { user: userId, seen: false },
      { seen: true }
    );

    res.status(200).json({
      success: true,
      message: 'Notificações marcadas como vistas.'
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