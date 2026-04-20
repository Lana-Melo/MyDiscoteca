// -----
// models/artistModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa um artista.
const artistSchema = new mongoose.Schema({
  // ISNI: International Standard Name Identifier, único para cada artista.
  isni: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Nome do artista.
  name: {
    type: String,
    required: true,
    trim: true
  },

  // Ano em que o artista iniciou atividade.
  yearStarted: {
    type: Number,
    required: true,
    min: 1000, // Ano mínimo razoável
    max: new Date().getFullYear() // Não pode ser no futuro
  },

  // Tipo de artista: solo (indivíduo) ou group (grupo de artistas).
  type: {
    type: String,
    enum: ['solo', 'group'],
    required: true,
    default: 'solo'
  },

  // Membros do grupo (apenas aplicável se type === 'group').
  // Referencia outros artistas que são solo.
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Artist',
    default: []
  },

  // TODO(user-sprint-1): o utilizador pode guardar um artista favorito, por isso
  // este modelo ja serve como alvo dessa referencia. Quando criarem o userModel,
  // a ligacao mais natural e algo como favoriteArtist: { type: ObjectId, ref: 'Artist' }.
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

// Modelo de artista para manipular
// documentos numa coleção do MongoDB.
module.exports = mongoose.model('Artist', artistSchema);

// -----
