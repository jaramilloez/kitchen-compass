const mongoose = require("mongoose");
const Joi = require("joi");

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
const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    pic: Joi.buffer().required(),
    directions: Joi.array().items(Joi.string().required()).required(),
    ingredients: Joi.array().items(Joi.required()).required(),
  };
  return Joi.validate(recipe, schema);
}

exports.Recipe = Recipe;
exports.validate = validateRecipe;
