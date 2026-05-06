// -----
// routes/albumCollectionRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos à coleção de álbuns.
const albumCollectionController = require('../controllers/albumCollectionController');

// -----

// Para agrupar as rotas sobre a coleção de álbuns de forma lógica.
const router = express.Router();

// Rota para obter a coleção do utilizador autenticado.
router.get('/me', albumCollectionController.getMyCollection);

// Rota para adicionar uma versão à coleção do utilizador autenticado.
router.post('/me/versions', albumCollectionController.addVersion);

// Rota para remover uma versão da coleção do utilizador autenticado.
router.delete('/me/versions/:versionId', albumCollectionController.removeVersion);

module.exports = router;

// -----
