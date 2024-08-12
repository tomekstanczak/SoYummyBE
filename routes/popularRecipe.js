const express = require("express");
const { getPopularRecipes } = require('../controllers/popularRecipes/popularRecipesIndex');

const router = express.Router();

/**
 * @swagger
 * /popular-recipe:
 *   get:
 *     summary: Get a list of popular recipes
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

router.get('/popular-recipe', getPopularRecipes);

module.exports = router;
