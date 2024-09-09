const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validate } = require("../models/users");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const duplicate = await User.findOne({ email: req.body.email });
  if (duplicate) return res.status(400).send("Email already has an account.");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("auth", token)
    .header("access-control-expose-headers", "auth")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (!user) res.status(404).send("User not found.");
  res.send(user);
});

module.exports = router;
