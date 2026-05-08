// -----
// routes/contributionRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos a contribuições.
const contributionController = require('../controllers/contributionController');

// -----

// Para agrupar as rotas sobre contribuições de forma lógica.
const router = express.Router();

// Rota para submeter um pedido de nova versão de álbum.
router.post('/album-version', contributionController.submitAlbumVersionRequest);

// Suporta filtro opcional: GET /album-version/my-requests?status=em+análise
router.get('/album-version/my-requests', contributionController.getMyRequests);

// Rota para simular resposta a um pedido — aceite ou recusado.
router.post('/album-version/:id/respond', contributionController.respondToRequest);

module.exports = router;

// -----