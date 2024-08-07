// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do dodawania przepisów.
// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do usuwania przepisu.
// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do otrzymywania przepisów utworzonych przez tego samego użytkownika.
const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middleware/uploadMiddleware");
const createRecipe = require("../controllers/ownRecipes.js/ownRecipesIndex");
const auth = require("../middleware/authenticate");

router.post(
  "/addRecipe",
  auth,
  uploadMiddleware.single("avatar"),
  createRecipe
);

module.exports = router;
