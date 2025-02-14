const express = require("express");

const { Tag } = require("../models/tags");
const { Recipe, validate } = require("../models/recipes");

const router = express.Router();
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.send(
    recipes.map((recipe) => ({
      _id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      servings: recipe.servings,
      tags: recipe.tags,
      pic: `data:image/jpg;base64,${recipe.pic}`,
    }))
  );
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send("Recipe not found.");
  res.send({
    _id: recipe._id,
    name: recipe.name,
    description: recipe.description,
    tags: recipe.tags,
    servings: recipe.servings,
    pic: `data:image/jpg;base64,${recipe.pic}`,
  });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, servings, tags, pic } = req.body;

  const tagObjs = tags.map((tag) => {
    const tagObj = Tag.findById(tag);
    if (!tagObj) return res.status(400).send("Invalid tag.");
    return tagObj;
  });

  const recipe = new Recipe({
    name: name,
    description: description,
    servings: servings,
    tags: tagObjs,
    pic: pic,
  });

  try {
    const result = await recipe.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
      res.status(400).send(ex.errors[field].message);
    }
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, servings, tag, pic } = req.body;

  const tagObjs = tags.map((tag) => {
    const tagObj = Tag.findById(tag);
    if (!tagObj) return res.status(400).send("Invalid tag.");
    return tagObj;
  });

  const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      name: name,
      description: description,
      servings: servings,
      tags: {
        _id: tagObj._id,
        name: tagObj.name,
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
