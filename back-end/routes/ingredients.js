const express = require("express");

const { Ingredient, validate } = require("../models/ingredients");
const { Category } = require("../models/categories");

const router = express.Router();
router.get("/", async (req, res) => {
  const ingredients = await Ingredient.find();
  res.send(ingredients);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category.");

  const ingredient = new Ingredient({
    name: req.body.name,
    category: category,
  });

  try {
    const result = await ingredient.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category.");

  const ingredient = await Ingredient.findByIdAndUpdate(req.params, {
    $set: {
      name: req.body.name,
      category: category,
    },
  });
  if (!ingredient) return res.status(404).send("Ingredient not found.");
  res.send(ingredient);
});

router.delete("/:id", async (req, res) => {
  const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
  if (!ingredient) return res.status(404).send("Ingredient not found.");
  res.send(ingredient);
});

module.exports = router;
