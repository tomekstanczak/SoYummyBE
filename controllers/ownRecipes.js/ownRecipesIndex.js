// /ownRecipes/ - utwórz punkt końcowy do dodawania przepisów.
// /ownRecipes/ - utwórz punkt końcowy do usuwania przepisu.
// /ownRecipes/ - utwórz punkt końcowy do otrzymywania przepisów utworzonych przez tego samego użytkownika.
const Joi = require("joi");
// const isImageAndTransform = require("../auth/auth-service");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const fs = require("fs").promises;

const {
  removeRecipe,
  fetchRecipe,
  fetchOwnRecipes,
  insertRecipe,
} = require("./ownRecipes-service");

const isImageAndTransform = require("../auth/auth-service");

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  area: Joi.string(),
  category: Joi.string().required(),
  time: Joi.number(),
  thumb: Joi.string(),
  preview: Joi.string(),
  ingredients: Joi.array().required(),
  instructions: Joi.string(),
});

const createRecipe = async (req, res, next) => {
  const { error, value } = recipeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { area, title, category, time, ingredients, instructions } = req.body;
    const { _id: userId } = req.user;
    const saveToDb = {
      area,
      title,
      category,
      time,
      ingredients,
      instructions,
      favorites: [],
      youtube: "",
      userId,
    };

    if (req.file) {
      const storagePhotoDir = path.join(process.cwd(), "public/photos");

      const { path: temporaryPath } = req.file;
      const extension = path.extname(temporaryPath);
      const fileName = `${uuidV4()}${extension}`;
      const filePath = path.join(storagePhotoDir, fileName);

      try {
        await fs.rename(temporaryPath, filePath);
      } catch (e) {
        await fs.unlink(temporaryPath);
        return next(e);
      }

      saveToDb.thumb = `/photos/${fileName}`;

      const previewFileName = `${uuidV4()}_preview${extension}`;
      const previewFilePath = path.join(storagePhotoDir, previewFileName);
      await fs.copyFile(filePath, previewFilePath);

      const isValidAndTransform = await isImageAndTransform(
        previewFilePath,
        357,
        344
      );
      if (!isValidAndTransform) {
        await fs.unlink(filePath);
        await fs.unlink(previewFilePath);
        return res.status(400).json({ message: "Isnt a photo but pretending" });
      }
      saveToDb.preview = `/photos/${previewFileName}`;
    }
    await insertRecipe(saveToDb);
    console.log(saveToDb);
    return res.status(201).json({ message: "Recipe created" });
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
      return res.json({
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
