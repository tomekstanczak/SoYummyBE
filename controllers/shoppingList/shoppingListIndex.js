const Ingredient = require('../../models/ingredients');
const {
    fetchShoppingList,
    fetchUserById
} = require('./shoppingList-service');


const getShoppingList = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const products = await fetchShoppingList(user.shoppingList);
        res.json({
            status: 200,
            data: { products }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    const { ttl, desc, t, thb } = req.body;
    const userId = req.user._id;

    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const newIngredient = new Ingredient({ ttl, desc, t, thb });
        await newIngredient.save();

        user.shoppingList.push(newIngredient);
        await user.save();

        res.status(201).json({
            status: 201,
            message: "Ingredient added to shopping list",
            ingredient: newIngredient
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    };
};

const deleteProduct = async (req, res, next) => {
    const productId = req.params._id;
    const userId = req.user._id;

    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const productIndex = user.shoppingList.findIndex(item => item.productId === productId);
        if (productIndex === -1) {
            return res.status(404).json({
                status: 404,
                message: "Product not found in shopping list"
            });
        }

        user.shoppingList.splice(productIndex, 1);
        await user.save();

        res.json({
            status: 200,
            message: "Product deleted from shopping list"
        });
        
    } catch (error) {
        console.log(error.message);
        next(error);
    };
};

module.exports = {
    getShoppingList,
    addProduct,
    deleteProduct
}