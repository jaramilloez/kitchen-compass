const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const groupSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userIds: {
    type: [String],
    required: true,
  },
});
const Group = mongoose.model("Group", groupSchema);

function validateGroup(group) {
  const schema = {
    code: Joi.string().required().length(6),
    userIds: Joi.array().items(Joi.objectId().required()).required(),
  };
  return Joi.validate(group, schema);
}

exports.Group = Group;
exports.validate = validateGroup;
