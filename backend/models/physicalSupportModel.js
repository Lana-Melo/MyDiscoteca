// -----
// models/physicalSupportModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa a distribuição de um álbum num suporte físico.
const physicalSupportSchema = new mongoose.Schema({
  // Tipo de suporte físico.
  type: {
    type: String,
    enum: ['CD', 'Vinyl', 'Cassette'],
    required: true
  },

  // Álbum ao qual este suporte físico pertence.
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },

  // Versões deste suporte físico (ex.: edições com capas diferentes).
  versions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Version'
  }]
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de suporte físico para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('PhysicalSupport', physicalSupportSchema);

// -----
