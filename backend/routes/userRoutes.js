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

// Rota para obter o perfil do utilizador autenticado.
router.get('/me', userController.getMe);

// Rota para atualizar o perfil do utilizador autenticado.
router.put('/me', userController.updateMe);

module.exports = router;

// -----
