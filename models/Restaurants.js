const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantCode: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    locationName: {
        type: String,
        required: true
    },
    googleLocation: {
        type: String,
        required: true
    },
    locationAddress: {
        type: String,
        required: true
    },
    placesToServe: {
        type: [String],
        required: true
    },
    placesBlocked: {
        type: [String],
        required: true
    },
    operatingHours: {
        type: {
            monday: {
                open: String,
                close: String
            },
            tuesday: {
                open: String,
                close: String
            },
            wednesday: {
                open: String,
                close: String
            },
            thursday: {
                open: String,
                close: String
            },
            friday: {
                open: String,
                close: String
            },
            saturday: {
                open: String,
                close: String
            },
            sunday: {
                open: String,
                close: String
            }
        },
        required: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
