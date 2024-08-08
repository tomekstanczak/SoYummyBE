const Recipe = require('../../models/recipes');
const User = require('../../models/user');

const fetchFavorite = (favorite) => {
    return Recipe.find({ _id: { $in: favorite }}).lean()
};

const fetchUserById = (userId) => {
    return User.findById({ _id: userId });
};

const fetchRecipeById = (recipeId) => {
    return Recipe.findById({ id: recipeId })
};

module.exports = {
    fetchFavorite,
    fetchUserById,
    fetchRecipeById
}