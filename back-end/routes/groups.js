const express = require("express");

const { Group, validate, generateCode } = require("../models/groups");
const { User } = require("../models/users");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.send(group);
});

router.post("/", async (req, res) => {
  //Receives an array of user ids

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await Group.findOne({ code });
  }

  const userIds = req.body;
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    const user = await User.findById(userId);
    if (!user) return res.status(400).send(`User with ID ${userId} not found.`);
  }

  const group = new Group({
    code: code,
    userIds: userIds,
  });

  try {
    const result = await group.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userIds = req.body.userIds;
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    const user = await User.findById(userId);
    if (!user) return res.status(400).send(`User with ID ${userId} not found.`);
  }

  const group = await Group.findByIdAndUpdate(req.params.id, {
    $set: {
      code: req.body.code,
      userIds: userIds,
    },
  });
  if (!group) return res.status(404).send("Group not found.");
  res.send(group);
});

router.delete("/:id", async (req, res) => {
  const group = await Group.findByIdAndDelete(req.params.id);
  if (!group) return res.status(404).send("Group not found.");
  res.send(group);
});

module.exports = router;
