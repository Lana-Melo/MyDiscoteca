// -----
// models/trackModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa a materialização de uma obra musical num álbum.
// Uma mesma Song pode aparecer em múltiplas Tracks (ex: original e ao vivo).
const trackSchema = new mongoose.Schema({
  // Número de ordem da faixa dentro do álbum.
  sequentialNumber: {
    type: Number,
    required: true,
    min: [1, 'Sequential number must be at least 1.'],
    validate: {
      validator: Number.isInteger,
      message: 'Sequential number must be an integer.'
    }
  },

  // A obra musical que esta faixa representa (ManyToOne: muitas Tracks -> uma Song).
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },

  // O álbum ao qual esta faixa pertence.
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  }
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de faixa para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Track', trackSchema);

// -----
