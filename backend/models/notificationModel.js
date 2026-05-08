// -----
// models/notificationModel.js
// -----

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// -----

// Esquema que representa uma notificação enviada ao utilizador
// após a resposta a um pedido de contribuição.
const notificationSchema = new mongoose.Schema({
  // Utilizador a quem a notificação se destina.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Pedido de contribuição ao qual a notificação se refere.
  contribution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution',
    required: true
  },

  // Título do álbum, guardado diretamente para evitar populate desnecessário.
  albumTitle: {
    type: String,
    required: true
  },

  // Designação da versão pedida, caso exista.
  designation: {
    type: String,
    default: null
  },

  // Resultado da resposta ao pedido.
  status: {
    type: String,
    enum: {
      values: ['Aceite', 'Recusado'],
      message: 'O estado deve ser "Aceite" ou "Recusado".'
    },
    required: true
  },

  // Indica se o utilizador já visualizou a notificação.
  seen: {
    type: Boolean,
    default: false
  }
},

// Adiciona campos createdAt e updatedAt ao esquema.
{ timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

// -----