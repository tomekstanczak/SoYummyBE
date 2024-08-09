const express = require("express");
const auth = require('../middleware/authenticate');
const {
    getShoppingList,
    addProduct,
    deleteProduct
} = require('../controllers/shoppingList/shoppingListIndex');

const router = express.Router();



router.get('/shopping-list', auth, getShoppingList);
router.post('/shopping-list/add', auth, addProduct);
router.delete('/shopping-list/delete/:id', auth, deleteProduct);

module.exports = router;
