// -----
// routes/artistRoutes.js
// -----

// Para programar as rotas e operações da API.
const express = require('express');

// Para aceder às funções com a lógica de resposta
// a pedidos da API relativos a artistas.
const artistController = require('../controllers/artistController');

// -----

// Para agrupar as rotas sobre artistas de forma lógica.
const router = express.Router();

// Rota para o registo de um novo artista.
router.post('/', artistController.create);

// Rota para obter a lista de todos os artistas.
router.get('/', artistController.getAll);

// TODO(user-sprint-1): se quiserem separar "listar todos" de "pesquisar por
// nome", podem manter GET / com query string (?name=...) ou criar uma rota
// explicita como GET /search. Este ficheiro e o sitio certo para essa decisao.

// Rota para obter um artista pelo seu id.
router.get('/:id', artistController.getById);

// Rota para deletar um artista pelo seu id.
router.delete('/:id', artistController.delete);

module.exports = router;

// -----
