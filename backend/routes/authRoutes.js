// -----
// routes/authRoutes.js
// -----

// Para programar as rotas e operacoes da API.
const express = require('express');

// Para aceder as funcoes com a logica de resposta
// a pedidos da API relativos a autenticacao.
const authController = require('../controllers/authController');

// -----

// Para agrupar as rotas de autenticacao de forma logica.
const router = express.Router();

// Rota para iniciar sessao.
router.post('/login', authController.login);

module.exports = router;

// -----
