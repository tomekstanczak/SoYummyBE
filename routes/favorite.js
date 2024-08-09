const express = require("express");
const auth = require('../middleware/authenticate');
const {
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe
} = require('../controllers/favorite/favoriteIndex');

const router = express.Router();

router.get('/favorite', auth, getFavoriteRecipes);
router.post('/favorite/add', auth, addFavoriteRecipe);
router.delete('/favorite/delete/:id', auth, removeFavoriteRecipe);

module.exports = router;
