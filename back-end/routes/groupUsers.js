const express = require("express");

const { User } = require("../models/users");
const { Group } = require("../models/groups");
const { GroupUser, validate } = require("../models/groupUsers");

const router = express.Router();
router.get("/user/:userId", async (req, res) => {
  const groupUser = await GroupUser.findOne({ userId: req.params.userId });
  if (!groupUser) return res.status(404).send("User may not be in a group.");
  res.send(groupUser);
});

router.get("/users/:groupId", async (req, res) => {
  const groupUsers = await GroupUser.find({ groupId: req.params.groupId });
  if (!groupUsers)
    return res.status(404).send("Group user relationship not found.");
  res.send(groupUsers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { groupId, userId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) return res.status(400).send("Invalid group.");

  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");

  const groupUser = new GroupUser({
    groupId: groupId,
    userId: userId,
  });

  try {
    const result = await groupUser.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.delete("/:id", async (req, res) => {
  const groupUser = await GroupUser.findByIdAndDelete(req.params.id);
  if (!groupUser)
    return res.status(404).send("Group user relationship not found.");
  res.send(groupUser);
});

module.exports = router;
