const mongoose = require("mongoose");
const Joi = require("joi");

const cuisineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const Cuisine = mongoose.model("Cuisine", cuisineSchema);

function validateCuisine(cuisine) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(cuisine);
}

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
exports.validate = validateCuisine;
