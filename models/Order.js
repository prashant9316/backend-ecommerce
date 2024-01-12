const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    coupons: [{
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coupon',
            required: true
        },
        percentageApplied: {
            type: Number,
            required: true
        },
        discountAmount: {
            type: Number,
            required: true
        }
    }],
    orderConfirmationStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    orderTracking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderTracking'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
