// -----
// routes/albumRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos a álbuns.
const albumController = require('../controllers/albumController');

// -----

// Para agrupar as rotas sobre álbuns de forma lógica.
const router = express.Router();

// Rota para o registo de um novo álbum.
router.post('/', albumController.create);

// Rota para obter a lista de todos os álbuns.
router.get('/', albumController.getAll);

// Rota para pesquisar álbuns por título (deve estar antes de /:id).
router.get('/search', albumController.searchAlbums);

// Rota para obter um álbum pelo seu id.
router.get('/:id', albumController.getById);

// Rota para deletar um álbum pelo seu id.
router.delete('/:id', albumController.delete);

module.exports = router;

// -----
