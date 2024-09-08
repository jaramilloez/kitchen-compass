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

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    pic: req.body.pic,
    directions: req.body.directions,
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

  const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      pic: req.body.pic,
      directions: req.body.directions,
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
