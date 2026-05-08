// -----
// models/notificationModel.js
// -----

const mongoose = require('mongoose');

// -----

// Schema representing a notification sent to the user
// after a contribution request has been responded to.
const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  contribution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution',
    required: true
  },

  // Stored directly to avoid unnecessary populate calls.
  albumTitle: {
    type: String,
    required: true
  },

  designation: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: {
      values: ['Accepted', 'Rejected'],
      message: 'Status must be "Accepted" or "Rejected".'
    },
    required: true
  },

  seen: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

// -----