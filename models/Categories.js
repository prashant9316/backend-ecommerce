const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryCode: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    discounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount'
    }],
    categoryImage: {
        type: String
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
