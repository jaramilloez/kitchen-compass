const mongoose = require("mongoose");
const Joi = require("joi");

const { cuisineSchema } = require("./cuisines");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: {
    type: cuisineSchema,
    required: true,
  },
  pic: {
    type: Buffer,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  recipeIngredients: {
    type: [ingredientSchema],
    required: true,
  },
  directions: {
    type: [String],
    required: true,
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.schema({
    name: Joi.string().required(),
    description: Joi.string().required(),
    pic: Joi.buffer().required(),
    servings: Joi.Number().required(),
    ingredients: Joi.array().items(Joi.required()).required(),
    directions: Joi.array().items(Joi.string().required()).required(),
  });
  return schema.validate(recipe);
}

exports.Recipe = Recipe;
exports.validate = validateRecipe;
