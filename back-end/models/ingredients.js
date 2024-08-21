const mongoose = require("mongoose");
const Joi = require("joi");

const { categorySchema } = require("./category");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true,
  },
});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

function validateIngredient(ingredient) {
  const schema = {
    name: Joi.string().required(),
    category: Joi.required(),
  };
  return Joi.validate(ingredient, schema);
}

exports.ingredientSchema = ingredientSchema;
exports.Ingredient = Ingredient;
exports.validate = validateIngredient;
