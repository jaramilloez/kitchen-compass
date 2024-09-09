const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const directionSchema = new mongoose.Schema(
  {
    recipeId: {
      type: String,
      required: true,
    },
    step: {
      type: String,
      required: true,
      match: /^\d{1,2}\.$/,
      message: "The step must be a valid number with format 1. or 10.",
    },
    instruction: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const Direction = mongoose.model("Direction", directionSchema);

function validateDirection(direction) {
  const schema = Joi.object({
    recipeId: Joi.objectId().required(),
    step: Joi.string()
      .required()
      .message("The step must be a valid number with format 1. or 10."),
    instruction: Joi.string().required(),
  });
  return schema.validate(direction);
}

exports.directionSchema = directionSchema;
exports.Direction = Direction;
exports.validate = validateDirection;
