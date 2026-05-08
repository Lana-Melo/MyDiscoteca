// -----
// models/albumCollectionModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa a coleção de álbuns físicos de um utilizador.
// Cada utilizador tem no máximo uma coleção, que armazena as versões
// (edições específicas) dos suportes físicos que possui.
const albumCollectionSchema = new mongoose.Schema({
  // Utilizador a quem esta coleção pertence (relação 1-para-1).
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Versões de suportes físicos que o utilizador possui.
  versions: [{
    version: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Version'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de coleção de álbuns para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('AlbumCollection', albumCollectionSchema);

// -----
