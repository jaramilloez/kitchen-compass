const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tagSchema = new mongoose.Schema(
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
const Tag = mongoose.model("Tag", tagSchema);

function validateTag(tag) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
  });
  return schema.validate(tag);
}

exports.tagSchema = tagSchema;
exports.Tag = Tag;
exports.validate = validateTag;
