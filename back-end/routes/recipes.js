const express = require("express");

const { Cuisine } = require("../models/cuisines");
const { Recipe, validate } = require("../models/recipes");

const router = express.Router();
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send("Recipe not found.");
  res.send(recipe);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, servings, cuisine, pic } = req.body;

  const cuisineObj = await Cuisine.findById(cuisine);
  if (!cuisineObj) return res.status(400).send("Invalid cuisine.");

  const recipe = new Recipe({
    name: name,
    description: description,
    servings: servings,
    cuisine: {
      _id: cuisineObj._id,
      name: cuisineObj.name,
    },
    pic: pic,
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

  const { name, description, servings, cuisine, pic } = req.body;

  const cuisineObj = await Cuisine.findById(cuisine);
  if (!cuisineObj) return res.status(400).send("Invalid cuisine.");

  const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      name: name,
      description: description,
      servings: servings,
      cuisine: {
        _id: cuisineObj._id,
        name: cuisineObj.name,
      },
      pic: pic,
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
