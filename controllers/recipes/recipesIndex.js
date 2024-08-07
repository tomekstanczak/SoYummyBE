const {
    fetchCategoryList,
    getDistinctCategories,
    getRecipesByCategory,
    fetchRecipeById,
    fetchRecipeWithLimit,
    searchRecipesByTitle
} = require('../../controllers/recipes/recipes-service');

const getCategoryList = async (req, res, next) => {
    try {
        const categories = await fetchCategoryList();
        res.json({
            status: 200,
            data: { categories }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const getMainPageRecipes = async (req, res, next) => {
    try {
        const categories = await getDistinctCategories();
        const results = {};

        await Promise.all(categories.map(async (category) => {
            const recipes = await getRecipesByCategory(category);
            results[category] = recipes;
        }));
        return res.status(200).json({
            status: 200,
            data: { recipes: results }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getRecipeWithLimit = async (req, res, next) => {
    try {
        const recipes = await fetchRecipeWithLimit(req.params.category);
        if (recipes) {
            return res.json({
                status: 200,
                data: { recipes }
            });
        };
        res.status(404).json({
            status: 404,
            message: "Not found"
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await fetchRecipeById(req.params.id);
        if (recipe) {
            return res.json({
                status: 200,
                data: { recipe }
            });
        };
        res.status(404).json({
            status: 404,
            message: "Not found"
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const searchByKey = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                status: 400,
                message: 'Keyword is missing.'
            });
        };

        const recipes = await searchRecipesByTitle(keyword);
        console.log(recipes)
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
    getRecipeById,
    getCategoryList,
    getMainPageRecipes,
    getRecipeWithLimit,
    searchByKey,
};