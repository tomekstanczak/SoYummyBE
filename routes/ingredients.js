const express = require("express");

const {
    getIngredientsList,
    getRecipeByIngredient
    } = require('../controllers/ingredients/ingredientsIndex');

const router = express.Router();

router.get('/ingredients/list', getIngredientsList);
router.get('/ingredients', getRecipeByIngredient);

module.exports = router;
