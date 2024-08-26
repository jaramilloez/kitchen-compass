const express = require("express");

const { Recipe, validate } = require("../models/recipes");
const { Ingredient } = require("../models/ingredients");

const router = express.Router();
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.send(recipe);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let ingredients = [];
  const ingredientIds = req.body.ingredients;
  for (let i = 0; i < ingredientIds.length; i++) {
    const ingredientId = ingredientIds[i];
    const ingredient = await User.findById(ingredientId);
    if (!ingredient)
      return res
        .status(400)
        .send(`Invalid ingredient with ID ${ingredientId}.`);

    ingredients += ingredient;
  }

  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    pic: req.body.pic,
    directions: req.body.directions,
    ingredients: ingredients,
  });

  try {
    const result = await recipe.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let ingredients = [];
  const ingredientIds = req.body.ingredients;
  for (let i = 0; i < ingredientIds.length; i++) {
    const ingredientId = ingredientIds[i];
    const ingredient = await User.findById(ingredientId);
    if (!ingredient)
      return res
        .status(400)
        .send(`Invalid ingredient with ID ${ingredientId}.`);

    ingredients += ingredient;
  }

  const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      pic: req.body.pic,
      directions: req.body.directions,
      ingredients: ingredients,
    },
  });
  if (!recipe) return res.status(404).send("Recipe not found.");
  res.send(recipe);
});

router.delete("/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) return res.status(404).send("Recipe not found.");
  res.send(recipe);
});

module.exports = router;
