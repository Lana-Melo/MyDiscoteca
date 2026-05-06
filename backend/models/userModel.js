// -----
// models/userModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Expressao regular para usernames apenas com letras e digitos.
const USERNAME_REGEX = /^[A-Za-z0-9]+$/;

// Expressao regular para passwords com 8+ caracteres, uma maiuscula,
// uma minuscula e um algarismo.
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Expressao regular simples para validar o formato do email.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
      match: [
        USERNAME_REGEX,
        'Username can only contain letters and numbers.'
      ]
    },

    // Endereco de email unico do utilizador.
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        EMAIL_REGEX,
        'Email must be in a valid format.'
      ]
    },

    // A password deve ser guardada cifrada, por isso o modelo usa passwordHash.
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },

    // Data de nascimento, validada para garantir idade minima de 13 anos.
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required.'],
      validate: {
        validator: isAtLeast13YearsOld,
        message: 'User must be at least 13 years old.'
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

userSchema.statics.validateUserRequirements = function validateUserRequirements({
  username,
  email,
  password,
  birthDate
}) {
  const messages = [];

  if (username !== undefined) {
    if (!username) {
      messages.push('Username is required.');
    } else if (!USERNAME_REGEX.test(username)) {
      messages.push('Username can only contain letters and numbers.');
    }
  }

  if (email !== undefined) {
    if (!email) {
      messages.push('Email is required.');
    } else if (!EMAIL_REGEX.test(email)) {
      messages.push('Email must be in a valid format.');
    }
  }

  if (password !== undefined) {
    if (!password) {
      messages.push('Password is required.');
    } else if (!PASSWORD_REGEX.test(password)) {
      messages.push('Password must have at least 8 characters, including uppercase, lowercase, and a number.');
    }
  }

  if (birthDate !== undefined) {
    if (!birthDate) {
      messages.push('Birth date is required.');
    } else if (!isAtLeast13YearsOld(new Date(birthDate))) {
      messages.push('User must be at least 13 years old.');
    }
  }

  return messages;
};

// Modelo de utilizador para manipular documentos numa colecao do MongoDB.
module.exports = mongoose.model('User', userSchema);

// -----
