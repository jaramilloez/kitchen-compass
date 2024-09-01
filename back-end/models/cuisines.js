const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Cuisine = mongoose.model("Cuisine", cuisineSchema);

function validateCuisine(cuisine) {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(cuisine, schema);
}

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
exports.validate = validateCuisine;
