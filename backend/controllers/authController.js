// -----
// controllers/authController.js
// -----

// Para usar o modelo de utilizador definido em Mongoose.
const User = require('../models/userModel');

// Para comparar senhas cifradas.
const bcrypt = require('bcrypt');

// Para gerar JSON Web Tokens.
const jwt = require('jsonwebtoken');

// -----

// Chave usada na geracao de JSON Web Tokens.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Validade de um JSON Web Token.
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h';

// -----

function buildUserResponse(userDocument) {
  return {
    id: userDocument.id,
    username: userDocument.username,
    email: userDocument.email,
    birthDate: userDocument.birthDate,
    favoriteArtist: userDocument.favoriteArtist,
    albumLists: userDocument.albumLists,
    createdAt: userDocument.createdAt,
    updatedAt: userDocument.updatedAt
  };
}

function buildToken(userDocument) {
  return jwt.sign(
    {
      sub: userDocument.id,
      username: userDocument.username
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );
}

// -----

// Autenticacao de um utilizador existente.
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username e password sao obrigatorios.'
      });
    }

    const user = await User.findOne({ username })
      .populate('favoriteArtist', 'isni name imageUrl yearStarted type');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Falha na autenticacao.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Falha na autenticacao.'
      });
    }

    const token = buildToken(user);

    res.status(200).json({
      success: true,
      message: 'Sessao iniciada com sucesso.',
      token,
      user: buildUserResponse(user)
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Erro do servidor durante a autenticacao.'
    });
  }
};

// -----
