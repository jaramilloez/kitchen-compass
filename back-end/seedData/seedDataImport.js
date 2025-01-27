const unitData = require("./units.json");
const recipeData = require("./recipes.json");
const ingredientData = require("./ingredients.json");
const categoryData = require("./category.json");
const cuisineData = require("./cuisine.json");
const { Unit } = require("../models/units");
const { Recipe } = require("../models/recipes");
const { Ingredient } = require("../models/ingredients");
const { Cuisine } = require("../models/cuisines");
const { Category } = require("../models/categories");

module.exports = async () => {
  try {
    await Recipe.deleteMany({});
    // await Recipe.insertMany(recipeData);
    await Cuisine.deleteMany({});
    await Cuisine.insertMany(cuisineData);
  } catch (err) {
    console.log("Error seeding data: ", err);
  }
};
