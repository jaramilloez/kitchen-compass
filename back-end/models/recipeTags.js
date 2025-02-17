const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const recipeTagSchema = new mongoose.Schema({
  recipe_id: {
    type: ObjectId,
    required: true,
  },
  tag_id: {
    type: ObjectId,
    required: true,
  },
});
const RecipeTag = mongoose.model("RecipeTags", recipeTagSchema);

function validateRecipeTag(recipeTag) {
  const schema = Joi.object({
    recipe_id: Joi.objectId().required(),
    tag_id: Joi.objectId().required(),
  });
  return schema.validate(recipeTag);
}

exports.RecipeTag = RecipeTag;
exports.validate = validateRecipeTag;
