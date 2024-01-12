const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    address: {
        house: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        landmark: {
            type: String
        },
        area: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    isServiceable: {
        type: Boolean,
        default: false
    }
});

userAddressSchema.index({ location: '2dsphere' });

const UserAddress = mongoose.model('UserAddress', userAddressSchema);

module.exports = UserAddress;
