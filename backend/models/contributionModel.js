// -----
// models/contributionModel.js
// -----

const mongoose = require('mongoose');

// -----

// Schema representing a contribution request for a new album version.
const contributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },

  // EAN-13: European Article Number, 13-digit barcode.
  eanCode: {
    type: String,
    required: [true, 'EAN-13 is required.'],
    trim: true,
    unique: true,
    minlength: [13, 'EAN-13 must be exactly 13 digits.'],
    maxlength: [13, 'EAN-13 must be exactly 13 digits.'],
    match: [/^\d{13}$/, 'EAN-13 must contain exactly 13 numeric digits.']
  },

  physicalSupport: {
    type: String,
    enum: {
      values: ['CD', 'Vinyl', 'Cassette'],
      message: 'Physical support must be CD, Vinyl, or Cassette.'
    },
    required: [true, 'Physical support is required.']
  },

  designation: {
    type: String,
    trim: true,
    default: null
  },

  status: {
    type: String,
    enum: {
      values: ['Pending', 'Accepted', 'Rejected'],
      message: 'Status must be "Pending", "Accepted", or "Rejected".'
    },
    default: 'Pending'
  }
},
{ timestamps: true });

module.exports = mongoose.model('Contribution', contributionSchema);

// -----