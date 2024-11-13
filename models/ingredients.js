const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ttl: {
    type: String,
  },
  desc: {
    type: String,
  },
  t: {
    type: String,
  },
  thb: {
    type: String,
  },
});

const Ingredient = mongoose.model(
  "ingredient",
  ingredientSchema,
  "ingredients"
);

module.exports = Ingredient;
