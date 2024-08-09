const Ingredient = require('../../models/ingredients');
const User = require('../../models/user');

const fetchShoppingList = (shoppingList) => {
    return Ingredient.find({ _id: { $in: shoppingList }}, {ttl: 1}).lean()
}

const fetchUserById = (userId) => {
    return User.findById({ _id: userId } );
}

module.exports = {
    fetchShoppingList,
    fetchUserById
}