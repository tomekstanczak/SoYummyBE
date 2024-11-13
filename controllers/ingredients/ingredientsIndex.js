const {
  fetchIngredientsList,
  searchRecipesByIngredient,
  fetchIngredientId,
} = require("./ingredients-service");

const getIngredientsList = async (req, res, next) => {
  try {
    const ingredients = await fetchIngredientsList();
    res.json({
      status: 200,
      data: { ingredients },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getRecipeByIngredient = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({
        status: 400,
        message: "Keyword is missing.",
      });
    }

    const idKeyword = await fetchIngredientId(keyword);

    if (!idKeyword) {
      return res.status(404).json({
        status: 404,
        message: "Ingredient not found.",
      });
    }

    const recipes = await searchRecipesByIngredient(idKeyword);

    return res.status(200).json({
      status: 200,
      data: { recipes },
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
