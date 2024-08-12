const express = require("express");
const auth = require('../middleware/authenticate');
const {
    getShoppingList,
    addProduct,
    deleteProduct
} = require('../controllers/shoppingList/shoppingListIndex');

const router = express.Router();

/**
 * @swagger
 * /shopping-list:
 *   get:
 *     summary: Get a shopping list
 *     tags: [Shopping list]
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

router.get('/shopping-list', auth, getShoppingList);

/**
 * @swagger
 * /shopping-list/add:
 *   post:
 *     summary: Add product to shopping list
 *     tags: [Shopping list]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ttl: 
 *                 type: string
 *               desc:
 *                 type:string
 *               t:
 *                 type: string
 *               thb:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Success
 */

router.post('/shopping-list/add', auth, addProduct);

/**
 * @swagger
 * /shopping-list/delete/:id:
 *   delete:
 *     summary: Delete product from shopping list
 *     tags: [Shopping list]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             message: "You deleted product from shopping list"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 */

router.delete('/shopping-list/delete/:id', auth, deleteProduct);

module.exports = router;
