const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    area: {
        type: String,
    },
    instructions: {
        type: String,
    },
    description: {
        type: String,
    },
    thumb: {
        type: String,
    },
    preview: {
        type: String,
    },
    time: {
        type: Number,
    },
    favorites: {
        type: Array,
    },
    youtube: {
        type: String,
    },
    tags: {
        type: Array,
    },
    ingredients: {
        type: Array,
    },
});

const Recipe = mongoose.model('recipe', recipeSchema, 'recipes');

module.exports = Recipe;

// sprawdzić walidację pól