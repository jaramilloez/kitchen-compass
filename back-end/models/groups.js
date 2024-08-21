const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const groupSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    length: 6,
  },
  userIds: {
    type: [String],
    required: true,
  },
});
const Group = mongoose.model("Group", groupSchema);

function validateGroup(group) {
  const schema = {
    code: Joi.string().unique().length(6),
    userIds: Joi.array().items(Joi.objectId().required()).required(),
  };
  return Joi.validate(group, schema);
}

function generateCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

exports.Group = Group;
exports.validate = validateGroup;
exports.generateCode = generateCode;
