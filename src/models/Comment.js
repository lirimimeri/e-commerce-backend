// Third-party packages import.
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

// Exports.
module.exports = mongoose.model('Comment', CommentSchema);
