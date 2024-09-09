const mongoose = require("mongoose");
const Joi = require("joi");

const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const Unit = mongoose.model("Unit", unitSchema);

function validateUnit(unit) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(unit);
}

exports.unitSchema = unitSchema;
exports.Unit = Unit;
exports.validate = validateUnit;
