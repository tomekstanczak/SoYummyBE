const { fetchAllRecipes } = require('./popularRecipes-service');

const getPopularRecipes = async (req, res, next) => {
    try {
        const popularRecipes = await fetchAllRecipes();

        res.status(200).json({
            status: 200,
            results: popularRecipes.length,
            data: popularRecipes,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    getPopularRecipes
}