const express = require("express");

const { Cuisine, validate } = require("../models/cuisines");

const router = express.Router();
router.get("/", async (req, res) => {
  const cuisines = await Cuisine.find();
  res.send(cuisines);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cuisine = new Cuisine({
    name: req.body.name,
  });

  try {
    const result = await cuisine.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

module.exports = router;
