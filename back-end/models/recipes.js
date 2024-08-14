const mongoose = require("mongoose");
const { ingredientSchema } = require("./ingredients");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pic: {
    type: Buffer,
    required: true,
  },
  directions: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [ingredientSchema],
    required: true,
  },
});

module.exports = recipeSchema;
