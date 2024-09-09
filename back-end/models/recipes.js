const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
  servings: {
    type: Number,
    required: true,
    max: 2,
  },
  cuisine: {
    type: cuisineSchema,
    required: true,
  },
  pic: {
    type: Buffer,
    required: true,
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    servings: Joi.number().required().max(2),
    cuisine: Joi.objectId().required(),
    pic: Joi.buffer().required(),
  });
  return schema.validate(recipe);
}

exports.Recipe = Recipe;
exports.validate = validateRecipe;
