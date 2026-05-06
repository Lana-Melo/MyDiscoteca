// -----
// models/versionModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa uma versão específica de um suporte físico
// (ex.: mesma edição em CD mas com capas diferentes).
const versionSchema = new mongoose.Schema({
  // EAN-13: European Article Number, código de barras com 13 dígitos.
  eanCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 13,
    maxlength: 13,
    match: [/^\d{13}$/, 'EAN code must be exactly 13 numeric digits.']
  },

  // Designação descritiva desta versão (ex.: "Red Cover Edition").
  designation: {
    type: String,
    required: true,
    trim: true
  },

  // Suporte físico ao qual esta versão pertence.
  physicalSupport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhysicalSupport',
    required: true
  }
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de versão para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Version', versionSchema);

// -----
