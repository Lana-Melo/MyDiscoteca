// -----
// models/albumModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa um álbum.
const albumSchema = new mongoose.Schema({
  // MBID: MusicBrainz Identifier — UUID de 36 caracteres no formato xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
  mbdi: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [36, 'MBID deve ter exatamente 36 caracteres.'],
    maxlength: [36, 'MBID deve ter exatamente 36 caracteres.'],
    match: [
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'MBID deve ser um UUID válido no formato xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.'
    ]
  },

  // Título do álbum.
  title: {
    type: String,
    required: true,
    trim: true
  },

  imageUrl: {
    type: String,
    trim: true,
    default: '/api/media/placeholders/album.svg'
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
  },

  // Faixas que compõem este álbum (ordenadas pelo sequentialNumber da Track).
  tracks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track'
  }],

  // Distribuições físicas deste álbum (CD, Vinyl, Cassette).
  physicalSupports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhysicalSupport'
  }]
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de álbum para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Album', albumSchema);

// -----
