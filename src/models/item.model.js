const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The item name cannot be empty',
        unique: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Item', ItemSchema);