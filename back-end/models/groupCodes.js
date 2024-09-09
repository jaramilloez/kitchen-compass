const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const groupCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
});
const GroupCode = mongoose.model("Group Code", groupCodeSchema);

function validateGroupCode(groupCode) {
  const schema = Joi.object({
    code: Joi.string().required().unique().length(6),
  });
  return schema.validate(groupCode);
}

function generateCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

exports.GroupCode = GroupCode;
exports.validate = validateGroupCode;
exports.generateCode = generateCode;
