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

/**
 * @swagger
 * /ownRecipes:
 *   post:
 *     summary: Creates a user recipe
 *     tags: [ownRecipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area:
 *                 type: string
 *               title:
 *                 type: string
 *               thumb:
 *                 type: string
 *               preview:
 *                 type: string
 *               category:
 *                 type: string
 *               time:
 *                 type: number
 *               ingredients:
 *                 type: string
 *               instructions:
 *                 type: string
 *               favorites:
 *                 type: array
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Recipe created
 */

//POST Creating recipe

router.post("/", auth, uploadMiddleware.single("photo"), createRecipe);

/**
 * @swagger
 * /ownRecipes:
 *   delete:
 *     summary: Delete recipe from data base
 *     tags: [ownRecipes]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             message: "You  have deleted recipe: ${recipeTitle}"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

// DELETE Own recipe

router.delete("/:id", auth, deleteRecipe);

/**
 * @swagger
 * /ownRecipes:
 *   get:
 *     summary: Get a list of recipes created by login user
 *     tags: [ownRecipes]
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

// GET Own recipes

router.get("/", auth, getOwnRecipes);

module.exports = router;
