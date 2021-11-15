const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    shippingData: {
        address: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            qty: { type: Number, required: true },
        },
    ],
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isDelivered: {
        type: Boolean,
        required: false,
        default: false,
    },
    deliveredAt: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
