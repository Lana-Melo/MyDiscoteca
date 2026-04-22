// -----
// routes/userRoutes.js
// -----

// Para programar as rotas e operacoes da API.
const express = require('express');

// Para aceder as funcoes com a logica de resposta
// a pedidos da API relativos a utilizadores.
const userController = require('../controllers/userController');

// -----

// Para agrupar as rotas sobre utilizadores de forma logica.
const router = express.Router();

// Rota para o registo de um novo utilizador.
router.post('/', userController.create);

// Rota para obter a lista de todos os utilizadores.
router.get('/', userController.getAll);

// Rota para obter um utilizador pelo seu id.
router.get('/:id', userController.getById);

// Rota para atualizar um utilizador pelo seu id.
router.put('/:id', userController.update);

// Rota para deletar um utilizador pelo seu id.
router.delete('/:id', userController.delete);

module.exports = router;

// -----
