// ROUTE do -> /recipes/category-list Utwórz punkt końcowy, aby uzyskać listę kategorii. Lista kategorii to:  'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'. Posortuj alfabetycznie.
// ROUTE do -> /recipes/main-page Utwórz punkt końcowy do otrzymywania przepisów według kategorii dla strony głównej.
// ROUTE do -> /recipes/:category Utwórz punkt końcowy do odbierania przepisów według kategorii po 8 przepisów.
// ROUTE do -> /recipes/:id - utwórz punkt końcowy, aby otrzymać jeden przepis według id.
// ROUTE do -> /search Utwórz punkt końcowy do wyszukiwania przepisów według słowa kluczowego w tytule.
const express = require("express");
const router = express.Router();

module.exports = router;
