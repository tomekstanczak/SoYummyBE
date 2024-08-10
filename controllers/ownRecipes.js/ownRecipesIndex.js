// /ownRecipes/ - utwórz punkt końcowy do dodawania przepisów.
// /ownRecipes/ - utwórz punkt końcowy do usuwania przepisu.
// /ownRecipes/ - utwórz punkt końcowy do otrzymywania przepisów utworzonych przez tego samego użytkownika.
const Joi = require("joi");
// const isImageAndTransform = require("../auth/auth-service");
const path = require("path");
// const { v4: uuidV4 } = require("uuid");
const {
  removeRecipe,
  fetchRecipe,
  fetchOwnRecipes,
  insertRecipe,
} = require("./ownRecipes-service");

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  time: Joi.number().required(),
  ingredients: Joi.array().required(),
  instructions: Joi.string().required(),
});

const createRecipe = async (req, res, next) => {
  const { error, value } = recipeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { area, title, category, time, ingredients, instructions } = req.body;
  const { _id: userId } = req.user;
  try {
    const recipe = await insertRecipe({
      area,
      title,
      // thumb: photoURL,
      category,
      time,
      ingredients,
      instructions,
      favorites: [],
      youtube: "",
      userId,
    });
    return res.status(201).json({ message: "Recipe created", recipe });
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: recipeId } = req.params;
  console.log(req.user);
  try {
    const recipeToDelete = await fetchRecipe(recipeId);

    if (recipeToDelete.owner.toString() === userId.toString()) {
      await removeRecipe(recipeId);
      res.json({
        status: 200,
        message: `You  have deleted recipe: ${recipeToDelete.title}`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getOwnRecipes = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const recipes = await fetchOwnRecipes(userId);
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRecipe, deleteRecipe, getOwnRecipes };
