const mongoose = require("mongoose");
const Joi = require("Joi");

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
const Recipe = mongoose.model("Recipe", recipeSchema);

function validateGroup(group) {
  const schema = {
    code: Joi.string().required().length(6),
    userIds: Joi.array().items(Joi.objectId().required()).required(),
  };
  return Joi.validate(group, schema);
}

exports.Recipe = Recipe;
exports.validate = validateGroup;
