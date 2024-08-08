const Ingredient = require('../../models/ingredients');
const User = require('../../models/user');
const {
    fetchShoppingList,
    removeItem
} = require('./shoppingList-service');


const getShoppingList = async (req, res, next) => {
    try {
        const products = await fetchShoppingList();
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
        const user = await User.findById(userId);
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
    const productId = req.params.id;
    
    try {
        if (!productId) {
            return res.status(404).json({
                status: 404,
                message: "Not found"
            });
        }
        await removeItem(productId)

        res.json({
            status: 200,
            message: "Product deleted"
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