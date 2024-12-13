const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const groupUserSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
const GroupUser = mongoose.model("Group User", groupUserSchema);

function validateGroupUser(groupUser) {
  const schema = Joi.object({
    groupId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
  });
  return schema.validate(groupUser);
}

exports.GroupUser = GroupUser;
exports.validate = validateGroupUser;
