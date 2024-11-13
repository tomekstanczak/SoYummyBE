const Recipe = require("../../models/recipes");
const Ingredient = require("../../models/ingredients");

const fetchIngredientsList = () => {
  return Ingredient.find({}).lean();
};

const fetchIngredientId = (keyword) => {
  return Ingredient.find(
    {
      ttl: { $regex: keyword, $options: "i" },
    },
    { _id: 1 }
  );
};

const searchRecipesByIngredient = (keyword) => {
  return Recipe.find({
    ingredients: {
      $elemMatch: {
        measure: { $regex: keyword, $options: "i" },
      },
    },
  });
};

module.exports = {
  fetchIngredientsList,
  searchRecipesByIngredient,
  fetchIngredientId,
};
