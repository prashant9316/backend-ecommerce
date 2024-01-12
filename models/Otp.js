const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    expires: 300 // OTP will automatically expire after 5 minutes (300 seconds)
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

