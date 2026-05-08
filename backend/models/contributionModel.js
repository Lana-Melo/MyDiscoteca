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
    required: [true, 'EAN-13 é obrigatório.'],
    trim: true,
    unique: true,
    minlength: [13, 'EAN-13 deve ter exatamente 13 dígitos.'],
    maxlength: [13, 'EAN-13 deve ter exatamente 13 dígitos.'],
    match: [/^\d{13}$/, 'EAN-13 deve conter exatamente 13 dígitos numéricos.']
  },

  // Suporte físico proposto (CD, vinil, ou cassete).
  physicalSupport: {
    type: String,
    enum: {
      values: ['CD', 'Vinyl', 'Cassette'],
      message: 'O suporte físico deve ser CD, Vinyl ou Cassette.'
    },
    required: [true, 'O suporte físico é obrigatório.']
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
      message: 'O estado deve ser "Em análise", "Aceite" ou "Recusado".'
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