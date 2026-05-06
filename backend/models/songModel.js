// -----
// models/songModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa uma canção
const songSchema = new mongoose.Schema({
  // ISRC: International Standard Recording Code, único para cada gravação.
  // Formato: CCXXXYYNNNN (12 caracteres sem hífenes).
  isrcCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    minlength: 12,
    maxlength: 12,
    match: [/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/, 'ISRC code must follow the format CCXXXYYNNNN.']
  },

  // Título da canção.
  title: {
    type: String,
    required: true,
    trim: true
  },

  // Duração em segundos.
  duration: {
    type: Number,
    required: true,
    min: [0, 'Duration must be a positive value.']
  },

  // Artistas que participam nesta canção.
  artists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Artist',
    default: []
  }
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de canção para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Song', songSchema);

// -----
