// -----
// routes/notificationRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos a notificações.
const notificationController = require('../controllers/notificationController');

// -----

// Para agrupar as rotas sobre notificações de forma lógica.
const router = express.Router();

// Rota para listar as notificações do utilizador autenticado.
router.get('/', notificationController.getMyNotifications);

// Rota para marcar todas as notificações como vistas.
router.patch('/seen', notificationController.markAsSeen);

module.exports = router;

// -----