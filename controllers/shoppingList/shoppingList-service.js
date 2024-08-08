//const Recipe = require('../../models/recipes');
const Ingredient = require('../../models/ingredients');
//const User = require('../../models/user');

const fetchShoppingList = () => {
    return Ingredient.find({}, {ttl: 1}).lean()
}

const removeItem = (productId) => {
    return Ingredient.deleteOne({
        productId: productId,
    })
};

module.exports = {
    fetchShoppingList,
    removeItem
}