const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false,
        required: false
    },
    userFlag: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
