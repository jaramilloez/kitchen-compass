const express = require("express");
const { User, validate } = require("../models/users");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});
router.post("/", async (req, res) => {});
router.put("/", async (req, res) => {});

module.exports = router;
