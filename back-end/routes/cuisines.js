const express = require("express");

const { Cuisine } = require("../models/cuisines");

const router = express.Router();
router.get("/", async (req, res) => {
  const cuisines = await Cuisine.find();
  res.send(cuisines);
});

module.exports = router;
