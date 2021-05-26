// Third-party packages imports.
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    photo: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
});

// Exports.
module.exports = mongoose.model('Product', ProductSchema);
