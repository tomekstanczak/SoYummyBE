const Recipe = require('../../models/recipes');

const fetchAllRecipes = () => {
    return Recipe.find().sort({ favorites: -1 }).limit(4);
};
module.exports = {
    fetchAllRecipes
};