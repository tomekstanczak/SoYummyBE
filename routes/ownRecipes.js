// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do dodawania przepisów.
// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do usuwania przepisu.
// ROUTE do -> /ownRecipes/ - utwórz punkt końcowy do otrzymywania przepisów utworzonych przez tego samego użytkownika.
const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  createRecipe,
  deleteRecipe,
  getOwnRecipes,
} = require("../controllers/ownRecipes.js/ownRecipesIndex");
const auth = require("../middleware/authenticate");

router.post("/", auth, uploadMiddleware.single("photo"), createRecipe);

router.delete("/:id", auth, deleteRecipe);

router.get("/", auth, getOwnRecipes);

module.exports = router;
