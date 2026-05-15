const mongoose = require('mongoose');

const albumListSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    albums: 
    [{
        album:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: true
        },
        addedAt:
        {
            type: Date,
            default: Date.now
        }
    }]
},

{timestamps: true});

albumListSchema.index({ user:1, name:1}, {unique: true});