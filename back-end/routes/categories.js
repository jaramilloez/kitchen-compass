const express = require("express");

const { Category, validate } = require("../models/categories");

const router = express.Router();
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  try {
    const result = await category.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

module.exports = router;
