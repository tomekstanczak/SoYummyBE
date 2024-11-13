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
  return ingredient._id;
};

const searchRecipesByIngredient = ({ keyword }) => {
  return Recipe.find({
    ingredients: {
      $elemMatch: {
        _id: keyword,
      },
    },
  });
};

module.exports = {
  fetchIngredientsList,
  searchRecipesByIngredient,
  fetchIngredientId,
};
