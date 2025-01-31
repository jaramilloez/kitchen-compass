const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const cuisineSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
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
    _id: Joi.string(),
    name: Joi.string().required(),
  });
  return schema.validate(cuisine);
}

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
exports.validate = validateCuisine;
