// -----
// models/albumModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa um álbum.
const albumSchema = new mongoose.Schema({
  // MBDI: MusicBrainz Database Identifier ou código único.
  mbdi: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Título do álbum.
  title: {
    type: String,
    required: true,
    trim: true
  },

  // Ano de lançamento do álbum.
  releaseYear: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear() + 1
  },

  // Tipo de álbum.
  type: {
    type: String,
    enum: ['single', 'EP', 'LP'],
    required: true
  },

  // Referência para o artista.
  // Não é obrigatório (pode não ter artista associado inicialmente),
  // mas se tiver, é apenas um (relação 1-para-muitos a partir do artista).
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: false
  }
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de álbum para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Album', albumSchema);

// -----
