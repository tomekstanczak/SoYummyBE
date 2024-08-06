const Recipe = require('../../models/recipes');
const Category = require('../../models/categoryList');

const fetchCategoryList = () => {
    return Category.find({}).sort({ title: 1 }).lean()
};

const getDistinctCategories = () => {
    return Recipe.distinct('category');
};

const getRecipesByCategory = (category) => {
    return Recipe.find({ category }).limit(4);
};

const fetchRecipeById = (id) => {
    return Recipe.findOne({
        _id: id,
    })
};

const fetchRecipeWithLimit = (category) => {
    return Recipe.find({
        category: category,
    }).limit(8)
};
// // do przeróbki
// const searchRecipesByTitle = (keyword) => {
//     return Recipe.find({
//         title: { $regex: keyword, $options: 'i' }
//     });
// };


module.exports = {
    fetchCategoryList,
    fetchRecipeById,
    getDistinctCategories,
    getRecipesByCategory,
    fetchRecipeWithLimit,
    //searchRecipesByTitle,
}