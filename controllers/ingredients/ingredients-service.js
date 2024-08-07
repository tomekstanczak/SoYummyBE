const Recipe = require('../../models/recipes');
const Ingredient = require('../../models/ingredients');

const fetchIngredientsList = () => {
    return Ingredient.find({}).lean()
};

const searchRecipesByIngredient = (keyword) => {
    return Recipe.find({
        ingredients: {
            $elemMatch: {
                measure: { $regex: keyword, $options: 'i' }
            }
        }
    });
}

module.exports = {
    fetchIngredientsList,
    searchRecipesByIngredient,
}