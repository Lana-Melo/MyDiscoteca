// -----
// controllers/userController.js
// -----

// Para usar os modelos definidos em Mongoose.
const User = require('../models/userModel');
const Artist = require('../models/artistModel');

// Para cifrar dados, em particular senhas de utilizadores.
const bcrypt = require('bcrypt');

// -----

// Valor de salt rounds para uso no bcrypt.
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

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
      message: `O campo '${duplicatedField}' ja esta a ser usado por outro utilizador.`
    });
  }

  if (error.name === 'ValidationError') {
    const validationMessages = Object.values(error.errors).map(
      (validationError) => validationError.message
    );

    return res.status(400).json({
      success: false,
      message: 'Os dados do utilizador nao cumprem os requisitos.',
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

    if (!username || !email || !password || !birthDate) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password e birthDate sao obrigatorios.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ username }, { email: normalizedEmail }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Ja existe um utilizador com esse username ou email.'
      });
    }

    const favoriteArtistDocument = await validateFavoriteArtist(favoriteArtist);

    if (favoriteArtistDocument === false) {
      return res.status(404).json({
        success: false,
        message: 'O artista favorito indicado nao existe.'
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      username,
      email: normalizedEmail,
      passwordHash,
      birthDate,
      favoriteArtist: favoriteArtist || null,
      albumLists: albumLists || []
    });

    await newUser.save();
    // essa linha devolve uma resposta mais completa do artista favorito
    // com ela comentada devolve somente o ID
    //await newUser.populate('favoriteArtist', 'isni name yearStarted type');

    res.status(201).json({
      success: true,
      message: 'Utilizador registado com sucesso.',
      user: buildUserResponse(newUser)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Erro do servidor durante o registo de um utilizador.'
    );
  }
};

// Obter a lista de todos os utilizadores.
exports.getAll = async (req, res) => {
  try {
    const users = await User.find()
      .populate('favoriteArtist', 'isni name yearStarted type');

    res.status(200).json({
      success: true,
      message: 'Lista de todos os utilizadores resgatada com sucesso.',
      users: users.map(buildUserResponse)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Erro do servidor durante a busca pelos utilizadores.'
    );
  }
};

// Obter um utilizador pelo seu id.
exports.getById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .populate('favoriteArtist', 'isni name yearStarted type');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilizador nao encontrado.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Utilizador encontrado com sucesso.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Erro do servidor durante a busca pelo utilizador.'
    );
  }
};

// Atualizar um utilizador pelo seu id.
exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      username,
      email,
      password,
      birthDate,
      currentPassword,
      favoriteArtist,
      albumLists
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilizador a atualizar nao existe.'
      });
    }

    const isProfileSensitiveUpdate =
      username !== undefined ||
      email !== undefined ||
      password !== undefined ||
      birthDate !== undefined;

    if (isProfileSensitiveUpdate) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'A password atual e obrigatoria para alterar username, email, password ou birthDate.'
        });
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'A password atual esta incorreta.'
        });
      }
    }

    if (username !== undefined && username !== user.username) {
      const usernameInUse = await User.findOne({
        username,
        _id: { $ne: userId }
      });

      if (usernameInUse) {
        return res.status(409).json({
          success: false,
          message: 'Ja existe outro utilizador com esse username.'
        });
      }

      user.username = username;
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail !== user.email) {
        const emailInUse = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: userId }
        });

        if (emailInUse) {
          return res.status(409).json({
            success: false,
            message: 'Ja existe outro utilizador com esse email.'
          });
        }
      }

      user.email = normalizedEmail;
    }

    if (birthDate !== undefined) {
      user.birthDate = birthDate;
    }

    if (password !== undefined) {
      user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    if (favoriteArtist !== undefined) {
      const favoriteArtistDocument = await validateFavoriteArtist(favoriteArtist);

      if (favoriteArtistDocument === false) {
        return res.status(404).json({
          success: false,
          message: 'O artista favorito indicado nao existe.'
        });
      }

      user.favoriteArtist = favoriteArtist || null;
    }

    if (albumLists !== undefined) {
      user.albumLists = albumLists;
    }

    await user.save();
    await user.populate('favoriteArtist', 'isni name yearStarted type');

    res.status(200).json({
      success: true,
      message: 'Utilizador atualizado com sucesso.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Erro do servidor durante a atualizacao de um utilizador.'
    );
  }
};

// Deletar um utilizador pelo seu id.
exports.delete = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUserDocument = await User.findByIdAndDelete(userId);

    if (!deletedUserDocument) {
      return res.status(404).json({
        success: false,
        message: 'Utilizador a remover nao existe.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Utilizador removido com sucesso.',
      deleted: buildUserResponse(deletedUserDocument)
    });
  } catch (error) {
    return handleUserError(
      error,
      res,
      'Erro do servidor durante a remocao de um utilizador.'
    );
  }
};

// -----
