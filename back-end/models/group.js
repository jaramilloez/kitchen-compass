const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userIds: {
    type: [String],
    required: true,
  },
});

module.exports = recipeSchema;
