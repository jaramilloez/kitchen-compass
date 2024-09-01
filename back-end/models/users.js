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
    required: false,
  },
  customRecipeIds: {
    type: [String],
    required: false,
  },
});
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.schema({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.String().required(),
    groupId: Joi.objectId(),
    customRecipeIds: Joi.array().items(Joi.objectId),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
