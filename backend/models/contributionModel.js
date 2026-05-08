// -----
// models/contributionModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa um pedido de contribuição de uma nova versão de álbum.
const contributionSchema = new mongoose.Schema({
  // Utilizador que submeteu o pedido.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Álbum ao qual a nova versão se refere.
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },

  // EAN-13: European Article Number, código de barras com 13 dígitos.
  eanCode: {
    type: String,
    required: [true, 'EAN-13 is required.'],
    trim: true,
    unique: true,
    minlength: [13, 'EAN-13 must have exactly 13 digits.'],
    maxlength: [13, 'EAN-13 must have exactly 13 digits.'],
    match: [/^\d{13}$/, 'EAN-13 must contain exactly 13 numeric digits.']
  },

  // Suporte físico proposto (CD, vinil, ou cassete).
  physicalSupport: {
    type: String,
    enum: {
      values: ['CD', 'Vinyl', 'Cassette'],
      message: 'Physical support must be CD, Vinyl, or Cassette.'
    },
    required: [true, 'Physical support is required.']
  },

  // Designação opcional da versão (ex.: "Red Cover Edition").
  designation: {
    type: String,
    trim: true,
    default: null
  },

  // Estado atual do pedido.
  status: {
    type: String,
    enum: {
      values: ['Em análise', 'Aceite', 'Recusado'],
      message: 'Status must be "Em análise", "Aceite", or "Recusado".'
    },
    default: 'Em análise'
  }
},

  // Adiciona campos createdAt e updatedAt ao esquema.
  { timestamps: true });

// Modelo de contribuição para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Contribution', contributionSchema);

// -----