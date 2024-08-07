const express = require("express");
const {
    getCategoryList,
    getMainPageRecipes,
    getRecipeWithLimit,
    getRecipeById,
    searchByKey,
} = require('../controllers/recipes/recipesIndex');



const router = express.Router();

/**
 * @swagger
 * /category-list:
 *   get:
 *     summary: Get a list of all category list
 *     tags: [Category]
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

// GET Category list

router.get('/recipes/category-list', getCategoryList);

//GET Main-page
router.get('/recipes/main-page', getMainPageRecipes);

//GET Category limit 8
router.get('/recipes/:category', getRecipeWithLimit);

/**
 * @swagger
 * /recipes/:id:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *         example:
 *             640cd5ac2d9fecf12e8897fc
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: Recipe not found
 */

router.get('/recipe/:id', getRecipeById);


//Search
// router.get('/search', searchByKey);

module.exports = router;
