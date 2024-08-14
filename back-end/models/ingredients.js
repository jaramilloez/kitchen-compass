const mongoose = require("mongoose");
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

module.exports = ingredientSchema;
