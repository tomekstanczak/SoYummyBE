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

const insertRecipe = (saveToDb) => {
  return Recipe.create({
    area: saveToDb.area,
    title: saveToDb.title,
    category: saveToDb.category,
    time: saveToDb.time,
    thumb: saveToDb.thumb,
    preview: saveToDb.preview,
    ingredients: saveToDb.ingredients,
    instructions: saveToDb.instructions,
    favorites: [],
    youtube: "",
    owner: saveToDb.userId,
  });
};

module.exports = { removeRecipe, fetchRecipe, fetchOwnRecipes, insertRecipe };
