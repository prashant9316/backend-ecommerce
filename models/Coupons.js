const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    discountName: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    discountMaxAmount: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    discountTnc: {
        type: String,
        required: true
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
