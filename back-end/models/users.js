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

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    groupId: Joi.objectId(),
    customRecipeIds: Joi.array().items(Joi.objectId),
  });
  return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    "jwtPrivateKey"
  );
  return token;
};

function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
exports.validateAuth = validateAuth;
