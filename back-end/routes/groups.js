const express = require("express");

const { Group, validate, generateCode } = require("../models/groups");
const { User } = require("../models/users");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.send(group);
});

router.post("/", async (req, res) => {
  //Receives a user id

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await Group.findOne({ code });
  }

  const user = await User.findById(req.body);
  if (!user) return res.status(400).send("User not found.");

  const group = new Group({
    code: code,
    userIds: [user.id],
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

  const group = await Group.findByIdAndUpdate(req.params.id, {
    $set: {
      code: req.body.code,
      userIds: [req.body.userIds],
    },
  });
  if (!group) return res.status(404).send("");
});

router.delete("/:id", async (req, res) => {});

module.exports = router;
