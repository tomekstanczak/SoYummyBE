// /ownRecipes/ - utwórz punkt końcowy do dodawania przepisów.
// /ownRecipes/ - utwórz punkt końcowy do usuwania przepisu.
// /ownRecipes/ - utwórz punkt końcowy do otrzymywania przepisów utworzonych przez tego samego użytkownika.
const Joi = require("joi");
const Recipe = require("../../models/recipes");
const User = require("../../models/user");
// const isImageAndTransform = require("../auth/auth-service");
const path = require("path");
// const { v4: uuidV4 } = require("uuid");

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  time: Joi.number().required(),
  ingredients: Joi.array().required(),
  instructions: Joi.string().required(),
});

// require("dotenv").config();

// const { SECRET } = process.env;

const createRecipe = async (req, res, next) => {
  const { error, value } = recipeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { area, title, category, time, ingredients, instructions } = req.body;
  const { _id } = req.user;

  // if (req.file) {
  //   const storagePhotoDir = path.join(process.cwd(), "public/photo");

  //   const { path: temporaryPath } = req.file;
  //   const extension = path.extname(temporaryPath);
  //   const fileName = `${uuidV4()}${extension}`;
  //   const filePath = path.join(storagePhotoDir, fileName);

  //   try {
  //     await fs.rename(temporaryPath, filePath);
  //   } catch (e) {
  //     await fs.unlink(temporaryPath);
  //     return next(e);
  //   }
  //   const isValidAndTransform = await isImageAndTransform(filePath);
  //   if (!isValidAndTransform) {
  //     await fs.unlink(filePath);
  //     return res.status(400).json({ message: "Isnt a photo but pretending" });
  //   }
  //   const photoURL = `/photos/${fileName}`;
  try {
    const user = await User.findOne(_id);
    const newRecipe = new Recipe({
      area,
      title,
      // thumb: photoURL,
      category,
      time,
      ingredients,
      instructions,
      favorites: [],
      youtube: "",
    });
    await newRecipe.save();
    const ownRecipes = user.ownRecipes;
    ownRecipes.push(newRecipe);
    await user.save();
    return res.status(201).json({ message: "Recipe created", newRecipe });
  } catch (err) {
    next(err);
  }
};

module.exports = createRecipe;
