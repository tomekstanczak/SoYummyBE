const express = require("express");
const auth = require('../middleware/authenticate');
const {
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe
} = require('../controllers/favorite/favoriteIndex');

const router = express.Router();


/**
 * @swagger
 * /favorite:
 *   get:
 *     summary: Get a list of favorite recipes
 *     tags: [Favorite]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */

router.get('/favorite', auth, getFavoriteRecipes);

/**
 * @swagger
 * /favorite/add:
 *   post:
 *     summary: Add recipe to favorite list
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId: 
 *                 type: string
 *     responses:
 *       '201':
 *         description: Success
 */

router.post('/favorite/add', auth, addFavoriteRecipe);

/**
 * @swagger
 * /favorite/delete/:id:
 *   delete:
 *     summary: Delete recipe from favorite list
 *     tags: [Favorite]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             message: "You deleted recipe from favorite list"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

router.delete('/favorite/delete/:id', auth, removeFavoriteRecipe);

module.exports = router;
