const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The list name cannot be empty',
        unique: true,
        trim: true
    },
    items: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('List', ListSchema);