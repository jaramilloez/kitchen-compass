const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const groupUserSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
const GroupUser = mongoose.model("GroupUser", groupUserSchema);

function validateGroupUser(groupUser) {
  const schema = Joi.object({
    group_id: Joi.objectId().required(),
    user_id: Joi.objectId().required(),
  });
  return schema.validate(groupUser);
}

exports.GroupUser = GroupUser;
exports.validate = validateGroupUser;
