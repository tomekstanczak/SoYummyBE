const { fetchIngredientsList, searchRecipesByIngredient } = require('./ingredients-service');

const getIngredientsList = async (req, res, next) => {
    try {
        const ingredients = await fetchIngredientsList();
        res.json({
            status: 200,
            data: { ingredients }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const getRecipeByIngredient = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({
                status: 400,
                message: 'Keyword is missing.'
            });
        };

        const recipes = await searchRecipesByIngredient(keyword);

        return res.status(200).json({
            status: 200,
            data: { recipes }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    getIngredientsList,
    getRecipeByIngredient,
};