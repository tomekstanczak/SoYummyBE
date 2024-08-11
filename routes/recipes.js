const express = require("express");
const {
  getCategoryList,
  getMainPageRecipes,
  getRecipeWithLimit,
  getRecipeById,
  searchByKey,
} = require("../controllers/recipes/recipesIndex");

const router = express.Router();

router.get("/recipes/category-list", getCategoryList);

router.get("/recipes/main-page", getMainPageRecipes);

router.get("/recipes/:category", getRecipeWithLimit); //swagger ready

router.get("/recipe/:id", getRecipeById);

//Search
router.get("/search", searchByKey);

module.exports = router;
