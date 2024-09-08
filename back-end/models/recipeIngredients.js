const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { unitSchema } = require("./units");

const recipeIngredientSchema = new mongoose.Schema({
  ingredientId: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: unitSchema,
    required: true,
  },
});
const RecipeIngredient = mongoose.model(
  "RecipeIngredient",
  recipeIngredientSchema
);

function validateRecipeIngredient(recipeIngredient) {
  const schema = Joi.object({
    ingredientId: Joi.objectId().required(),
    recipeId: Joi.objectId().required(),
    amount: Joi.number().required(),
    unit: Joi.objectId().required(),
  });
  return schema.validate(recipeIngredient);
}

exports.recipeIngredientSchema = recipeIngredientSchema;
exports.RecipeIngredient = RecipeIngredient;
exports.validate = validateRecipeIngredient;
