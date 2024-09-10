const express = require("express");

const { Recipe } = require("../models/recipes");
const { Direction, validate } = require("../models/directions");

const router = express.Router();
router.get("/:recipeId", async (req, res) => {
  const directions = await Direction.find({ recipeId: req.params.recipeId });
  if (!directions) return res.status(404).send("Directions not found.");
  res.send(directions);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { recipeId, step, instruction } = req.body;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(400).send("Invalid recipe.");

  const direction = new Direction({
    recipeId: recipeId,
    step: step,
    instruction: instruction,
  });

  try {
    const result = await direction.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { recipeId, step, instruction } = req.body;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(400).send("Invalid recipe.");

  const direction = await Direction.findByIdAndUpdate(req.params.id, {
    $set: {
      recipeId: recipeId,
      step: step,
      intruction: instruction,
    },
  });
  if (!direction) return res.status(404).send("Direction not found.");
  res.send(direction);
});

router.delete("/:id", async (req, res) => {
  const direction = await Direction.findByIdAndDelete(req.params.id);
  if (!direction) return res.status(404).send("Direction not found.");
  res.send(direction);
});

module.exports = router;
