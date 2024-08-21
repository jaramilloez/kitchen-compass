const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  customRecipeIds: {
    type: [String],
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.String().required(),
    groupId: Joi.objectId().required(),
    customRecipeIds: Joi.array().items(Joi.objectId),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
