const mongoose = require("mongoose");
const Joi = require("joi");

const { categorySchema } = require("./categories");

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
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.required(),
  });
  return schema.validate(ingredient);
}

exports.ingredientSchema = ingredientSchema;
exports.Ingredient = Ingredient;
exports.validate = validateIngredient;
