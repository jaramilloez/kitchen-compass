const express = require("express");

const { Unit } = require("../models/units");
const { Recipe } = require("../models/recipes");
const { Ingredient } = require("../models/ingredients");
const { RecipeIngredient, validate } = require("../models/recipeIngredients");

const router = express.Router();
router.get("/:recipeId", async (req, res) => {
  const recipeIngredients = await RecipeIngredient.find({
    recipeId: req.params.recipeId,
  });
  if (!recipeIngredient)
    return res.status(404).send("Ingredient to recipe relationship not found.");
  res.send(recipeIngredients);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { ingredientId, recipeId, amount, unit } = req.body;

  const ingredient = await Ingredient.findById(ingredientId);
  if (!ingredient) return res.status(400).send("Invalid ingredient.");

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(400).send("Invalid recipe.");

  const unitObj = await Unit.findById(unit);
  if (!unitObj) return res.status(400).send("Invalid unit.");

  const recipeIngredient = new RecipeIngredient({
    ingredientId: ingredientId,
    recipeId: recipeId,
    amount: amount,
    unit: {
      _id: unitObj._id,
      name: unitObj.name,
    },
  });

  try {
    const result = await recipeIngredient.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { ingredientId, recipeId, amount, unit } = req.body;

  const ingredient = await Ingredient.findById(ingredientId);
  if (!ingredient) return res.status(400).send("Invalid ingredient.");

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(400).send("Invalid recipe.");

  const unitObj = await Unit.findById(unit);
  if (!unitObj) return res.status(400).send("Invalid unit.");

  const recipeIngredient = await RecipeIngredient.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ingredientId: ingredientId,
        recipeId: recipeId,
        amount: amount,
        unit: {
          _id: unitObj._id,
          name: unitObj.name,
        },
      },
    }
  );
  if (!recipeIngredient)
    return res.status(404).send("Ingredient to recipe relationship not found.");
  res.send(recipeIngredient);
});

router.delete("/:id", async (req, res) => {
  const recipeIngredient = await RecipeIngredient.findByIdAndDelete(
    req.params.id
  );
  if (!recipeIngredient)
    return res.status(404).send("Recipe ingredient relationship not found.");
  res.send(recipeIngredient);
});

module.exports = router;
