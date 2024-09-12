const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validate, validateAuth } = require("../models/users");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("User not found.");
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

//Checks the request's email and password.
//If they're correct, an auth token is generated and sent.
router.post("/auth", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  let user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
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
