const express = require("express");
const { Group, validate } = require("../models/group");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.send(group);
});
router.post("/", async (req, res) => {});
router.put("/:id", async (req, res) => {});

module.exports = router;
