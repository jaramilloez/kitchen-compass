const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Cuisine = mongoose.model("Cuisine", cuisineSchema);

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
