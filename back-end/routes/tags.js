const express = require("express");

const { Tag, validate } = require("../models/tags");

const router = express.Router();
router.get("/", async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tag = new Tag({
    name: req.body.name,
  });

  try {
    const result = await tag.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

module.exports = router;
