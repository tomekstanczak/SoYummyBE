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
 * /recipes/category-list:
 *   get:
 *     summary: Get a list of all categories
 *     tags: [Recipes]
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
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

// GET Category list
router.get('/recipes/category-list', getCategoryList);

/**
 * @swagger
 * /recipes/main-page:
 *   get:
 *     summary: Get a list of main page recipes
 *     tags: [Recipes]
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

//GET Main-page
router.get('/recipes/main-page', getMainPageRecipes);

/**
 * @swagger
 * /recipes/:category:
 *   get:
 *     summary: Get a list of recipes by category with limit 8
 *     tags: [Recipes]
 *     parameters:
 *      - name: category
 *        description: Example - Beef
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

//GET Category limit 8
router.get('/recipes/:category', getRecipeWithLimit); //swagger ready

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

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search recipes by keyword
 *     tags: [Recipes]
 *     parameters:
 *       - name: keyword
 *         in: path
 *         description: The keyword
 *         schema:
 *           type: string
 *         example:
 *             chicken
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

//Search
router.get('/search', searchByKey);

module.exports = router;
