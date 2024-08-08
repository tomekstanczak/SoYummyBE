const {
    fetchFavorite,
    fetchUserById,
    fetchRecipeById
} = require('./favorite-service');

const getFavoriteRecipes = async (req, res, next) => {
const userId = req.user._id;
    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const recipes = await fetchFavorite(user.favorite);
        res.json({
            status: 200,
            data: { recipes }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const addFavoriteRecipe = async (req, res, next) => {
    const { recipeId } = req.body;
    const userId = req.user._id;
    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const recipe = await fetchRecipeById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                status: 404,
                message: "Recipe not found",
            });
        }

        if (user.favorite.includes(recipeId)) {
            return res.status(400).json({
                status: 400,
                message: "Recipe is already in favorites",
            });
        }

        user.favorite.push(recipeId);
        await user.save();

        recipe.favorites.push(userId);
        await recipe.save();

        res.status(201).json({
            status: 201,
            message: "Favorite recipe added",
            favorite: recipe
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    };
};

const removeFavoriteRecipe = async (req, res, next) => {
    const recipeId = req.params.id;
    const userId = req.user._id;

    try {
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const index = user.favorite.indexOf(recipeId);
        if (index === -1) {
            return res.status(404).json({
                status: 404,
                message: "Recipe not found in favorites"
            });
        }

        user.favorite.splice(index, 1);
        await user.save();
        
        const recipe = await fetchRecipeById(recipeId);
        if (recipe) {
            const userIndex = recipe.favorites.indexOf(userId);
            if (userIndex !== -1) {
                recipe.favorites.splice(userIndex, 1);
                await recipe.save();
            }
        }

        res.json({
            status: 200,
            message: "Recipe deleted from favorites"
        });
        
    } catch (error) {
        console.log(error.message);
        next(error);
    };
};

module.exports = {
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe
}