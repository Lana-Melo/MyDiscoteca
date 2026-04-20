// -----
// models/userModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Expressao regular para usernames apenas com letras e digitos.
const USERNAME_REGEX = /^[A-Za-z0-9]+$/;

// Verifica se a data de nascimento corresponde a pelo menos 13 anos de idade.
function isAtLeast13YearsOld(birthDate) {
  if (!(birthDate instanceof Date) || Number.isNaN(birthDate.getTime())) {
    return false;
  }

  const today = new Date();
  const minimumBirthDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );

  return birthDate <= minimumBirthDate;
}

// Esquema que representa um utilizador.
const userSchema = new mongoose.Schema(
  {
    // Nome de utilizador unico, contendo apenas letras e digitos.
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: USERNAME_REGEX
    },

    // Endereco de email unico do utilizador.
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    // A password deve ser guardada cifrada, por isso o modelo usa passwordHash.
    passwordHash: {
      type: String,
      required: true
    },

    // Data de nascimento, validada para garantir idade minima de 13 anos.
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: isAtLeast13YearsOld,
        message: 'O utilizador tem de ter pelo menos 13 anos.'
      }
    },

    // Artista favorito opcional. Cada utilizador pode ter no maximo um.
    favoriteArtist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      default: null
    },

    // Listas personalizadas do utilizador.
    // A entidade AlbumList sera definida noutro modelo.
    albumLists: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'AlbumList',
      default: []
    }
  },
  { timestamps: true }
);

// Modelo de utilizador para manipular documentos numa colecao do MongoDB.
module.exports = mongoose.model('User', userSchema);

// -----
