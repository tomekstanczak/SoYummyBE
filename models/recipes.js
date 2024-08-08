//const { required } = require('joi');
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    area: {
        type: String,
        default: null,
    },
    instructions: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    thumb: {
        type: String,
        default: null,
    },
    preview: {
        type: String,
        default: null,
    },
    time: {
        type: Number,
        default: null,
    },
    favorites: {
        type: Array,
        default: [],
    },
    youtube: {
        type: String,
        default: null,
    },
    tags: {
        type: Array,
        default: [],
    },
    ingredients: {
        type: Array,
        required: [true, 'Ingredients are required']
    },
});

const Recipe = mongoose.model('recipe', recipeSchema, 'recipes');

module.exports = Recipe;