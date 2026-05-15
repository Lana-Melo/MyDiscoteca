// -----
// routes/albumListRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos às listas personalizadas de álbuns.
const albumListController = require('../controllers/albumListController');

// -----

// Para agrupar as rotas sobre listas de álbuns de forma lógica.
const router = express.Router();

// Rota para criar uma lista personalizada do utilizador autenticado.
router.post('/', albumListController.create);

module.exports = router;

// -----
