const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { tagSchema } = require("./tags");

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
  },
  tags: {
    type: [tagSchema],
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
    servings: Joi.number().required(),
    tags: Joi.array().items(Joi.objectId()).required(),
    pic: Joi.binary().required(),
  });
  return schema.validate(recipe);
}

exports.Recipe = Recipe;
exports.validate = validateRecipe;
