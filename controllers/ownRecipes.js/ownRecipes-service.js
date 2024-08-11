const Recipe = require("../../models/recipes");

const fetchRecipe = (id) => {
  return Recipe.findOne({
    _id: id,
  });
};

const removeRecipe = (id) => {
  return Recipe.deleteOne({
    _id: id,
  });
};
const fetchOwnRecipes = (userId) => {
  return Recipe.find({ owner: userId });
};

const insertRecipe = ({
  area,
  title,
  category,
  time,
  thumb,
  preview,
  ingredients,
  instructions,
  userId,
}) => {
  return Recipe.create({
    area,
    title,
    category,
    time,
    thumb,
    preview,
    ingredients,
    instructions,
    favorites: [],
    youtube: "",
    owner: userId,
  });
};

module.exports = { removeRecipe, fetchRecipe, fetchOwnRecipes, insertRecipe };
