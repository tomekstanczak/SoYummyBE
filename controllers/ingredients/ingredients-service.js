const Recipe = require("../../models/recipes");
const Ingredient = require("../../models/ingredients");

const fetchIngredientsList = () => {
  return Ingredient.find({}).lean();
};

const fetchIngredientId = async (keyword) => {
  const ingredient = await Ingredient.findOne(
    { ttl: { $regex: keyword, $options: "i" } },
    { _id: 1 }
  );
  return ingredient ? ingredient._id.toString() : null; // Zwróć tylko _id jako string lub null
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
