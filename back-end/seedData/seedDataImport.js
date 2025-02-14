const unitData = require("./units.json");
const recipeData = require("./recipes.json");
const ingredientData = require("./ingredients.json");
const categoryData = require("./category.json");
const tagData = require("./tags.json");
const { Unit } = require("../models/units");
const { Recipe } = require("../models/recipes");
const { Ingredient } = require("../models/ingredients");
const { Tag } = require("../models/tags");
const { Category } = require("../models/categories");

module.exports = async () => {
  try {
    await Tag.deleteMany({});
    await Tag.insertMany(tagData);
  } catch (err) {
    console.log("Error seeding data: ", err);
  }
};
