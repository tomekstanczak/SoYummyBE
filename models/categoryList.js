const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    thumb: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Category = mongoose.model('categoryList', categorySchema, 'categoriesList');

module.exports = Category;

// sprawdzić walidację na pola