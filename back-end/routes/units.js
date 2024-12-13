const express = require("express");

const { Unit, validate } = require("../models/units");

const router = express.Router();
router.get("/", async (req, res) => {
  const units = await Unit.find();
  res.send(units);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const unit = new Unit({
    name: req.body.name,
  });

  try {
    const result = await unit.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

module.exports = router;
