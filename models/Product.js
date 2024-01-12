const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount'
    }],
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number
    },
    variants: [{
        type: String
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
