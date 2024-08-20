const express = require("express");
const { Recipe, validate } = require("../models/recipes");

const router = express.Router();
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.send(recipe);
});
router.post("/", async (req, res) => {});
router.put("/", async (req, res) => {});
router.delete("/", async (req, res) => {});

module.exports = router;
