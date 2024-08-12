const express = require("express");

const {
    getIngredientsList,
    getRecipeByIngredient
    } = require('../controllers/ingredients/ingredientsIndex');

const router = express.Router();

/**
 * @swagger
 * /ingredients/list:
 *   get:
 *     summary: Get a list of ingredients
 *     tags: [Ingredients]
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

router.get('/ingredients/list', getIngredientsList);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Search recipes by ingredients
 *     tags: [Ingredients]
 *     parameters:
 *       - name: keyword
 *         in: path
 *         description: The keyword
 *         schema:
 *           type: string
 *         example:
 *             2
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

router.get('/ingredients', getRecipeByIngredient);

module.exports = router;
