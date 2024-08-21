const express = require("express");

const { Ingredient, validate } = require("../models/ingredients");

const router = express.Router();
router.get("/", async (req, res) => {
  const ingredients = await Ingredient.find();
  res.send(ingredients);
});
router.post("/", async (req, res) => {});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
