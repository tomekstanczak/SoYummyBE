const express = require("express");
const { getPopularRecipes } = require('../controllers/popularRecipes/popularRecipesIndex');

const router = express.Router();

router.get('/popular-recipe', getPopularRecipes);

module.exports = router;
