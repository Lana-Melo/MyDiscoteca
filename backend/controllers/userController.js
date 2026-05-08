// -----
// controllers/userController.js
// -----

// Para usar os modelos definidos em Mongoose.
const User = require('../models/userModel');
const Artist = require('../models/artistModel');

// Para cifrar dados, em particular senhas de utilizadores.
const bcrypt = require('bcrypt');

// Para validar JSON Web Tokens.
const jwt = require('jsonwebtoken');

// -----

// Valor de salt rounds para uso no bcrypt.
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Chave usada na validacao de JSON Web Tokens.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// -----

// Prepara a representacao publica de um utilizador sem expor a password cifrada.
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

// Converte alguns erros comuns de validacao/duplicacao em respostas mais uteis.
function handleUserError(error, res, defaultMessage) {
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyPattern)[0];

    return res.status(409).json({
      success: false,
      message: `The '${duplicatedField}' field is already being used by another user.`
    });
  }

  if (error.name === 'ValidationError') {
    const validationMessages = Object.values(error.errors).map(
      (validationError) => validationError.message
    );

    return res.status(400).json({
      success: false,
      message: 'User data does not meet the requirements.',
      errors: validationMessages
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: defaultMessage
  });
}

// Valida se o artista favorito existe, quando fornecido.
async function validateFavoriteArtist(favoriteArtist) {
  if (!favoriteArtist) {
    return null;
  }

  const artist = await Artist.findById(favoriteArtist);
  return artist || false;
}

// Resolve o utilizador autenticado.
// Quando houver bearer token valido, usa-se o id do token.
// Enquanto o login ainda nao estiver totalmente ligado no frontend, o header
// x-user-id continua disponivel como fallback temporario de desenvolvimento.
function resolveAuthenticatedUserId(req) {
  if (req.token) {
    try {
      const payload = jwt.verify(req.token, JWT_SECRET);
      return payload.sub;
    } catch (error) {
      return null;
    }
  }

  return req.get('x-user-id') || null;
}

// -----

// Registo de um novo utilizador.
exports.create = async (req, res) => {
  try {
    // Dados do novo utilizador vêm no corpo do pedido.
    const {
      username,
      email,
      password,
      birthDate,
      favoriteArtist,
      albumLists
    } = req.body;

    const normalizedUsername =
      typeof username === 'string' ? username.trim() : '';
    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';
    const validationMessages = User.validateUserRequirements({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      birthDate
    });

    if (!username || !email || !password || !birthDate) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password, and birthDate are required.',
        errors: validationMessages
      });
    }

    if (validationMessages.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User data does not meet the requirements.',
        errors: validationMessages
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username: normalizedUsername }, { email: normalizedEmail }]
    });

    if (existingUser) {
      const duplicatedField =
        existingUser.email === normalizedEmail ? 'email' : 'username';

      return res.status(409).json({
        success: false,
        message: duplicatedField === 'email'
          ? 'This email is already being used by another user.'
          : 'This username is already being used by another user.'
      });
    }

    const favoriteArtistDocument = await validateFavoriteArtist(favoriteArtist);

    if (favoriteArtistDocument === false) {
      return res.status(404).json({
        success: false,
        message: 'The selected favorite artist does not exist.'
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash,
      birthDate,
      favoriteArtist: favoriteArtist || null,
      albumLists: albumLists || []
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: buildUserResponse(newUser)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Server error while registering the user.'
    );
  }
};

// Obter o perfil do utilizador autenticado.
exports.getMe = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const user = await User.findById(userId)
      .populate('favoriteArtist', 'isni name imageUrl yearStarted type');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Server error while fetching the user profile.'
    );
  }
};

// Atualizar o perfil do utilizador autenticado.
exports.updateMe = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);
    const {
      username,
      email,
      password,
      newPassword,
      birthDate,
      currentPassword,
      favoriteArtist,
      albumLists
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Could not identify the authenticated user.'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User to update does not exist.'
      });
    }

    const passwordToUpdate = newPassword !== undefined ? newPassword : password;

    const isProfileSensitiveUpdate =
      username !== undefined ||
      email !== undefined ||
      passwordToUpdate !== undefined ||
      birthDate !== undefined;

    if (isProfileSensitiveUpdate) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change username, email, password, or birthDate.'
        });
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect.'
        });
      }
    }

    const normalizedUsername =
      typeof username === 'string' ? username.trim() : username;
    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : email;

    const validationMessages = User.validateUserRequirements({
      username: normalizedUsername,
      email: normalizedEmail,
      password: passwordToUpdate,
      birthDate
    });

    if (validationMessages.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User data does not meet the requirements.',
        errors: validationMessages
      });
    }

    if (normalizedUsername !== undefined && normalizedUsername !== user.username) {
      const usernameInUse = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: userId }
      });

      if (usernameInUse) {
        return res.status(409).json({
          success: false,
          message: 'Another user is already using that username.'
        });
      }

      user.username = normalizedUsername;
    }

    if (email !== undefined) {
      if (normalizedEmail !== user.email) {
        const emailInUse = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: userId }
        });

        if (emailInUse) {
          return res.status(409).json({
            success: false,
            message: 'Another user is already using that email.'
          });
        }
      }

      user.email = normalizedEmail;
    }

    if (birthDate !== undefined) {
      user.birthDate = birthDate;
    }

    if (passwordToUpdate !== undefined) {
      user.passwordHash = await bcrypt.hash(passwordToUpdate, SALT_ROUNDS);
    }

    if (favoriteArtist !== undefined) {
      const favoriteArtistDocument = await validateFavoriteArtist(favoriteArtist);

      if (favoriteArtistDocument === false) {
        return res.status(404).json({
          success: false,
          message: 'The selected favorite artist does not exist.'
        });
      }

      user.favoriteArtist = favoriteArtist || null;
    }

    if (albumLists !== undefined) {
      user.albumLists = albumLists;
    }

    await user.save();
    await user.populate('favoriteArtist', 'isni name imageUrl yearStarted type');

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Server error while updating the user profile.'
    );
  }
};

// -----
