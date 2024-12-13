const express = require("express");

const { Group, validate, generateCode } = require("../models/groups");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).send("Group not found.");
  res.send(group);
});

router.get("/join/:code", async (req, res) => {
  const group = await Group.findOne(req.params.code);
  if (!group) return res.status(404).send("Group not found.");
  res.send(group);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await Group.findOne({ code });
  }

  const group = new Group({
    code: code,
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

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await Group.findOne({ code });
  }

  const group = await Group.findByIdAndUpdate(req.params.id, {
    $set: {
      code: code,
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
