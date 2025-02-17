const express = require("express");

const { RecipeTag, validate } = require("../models/recipeTags");

const router = express.Router();
router.get("/", async (req, res) => {
  const query = req.query;
  const recipeTags = await RecipeTag.find(query);
  if (!recipeTags)
    return res.status(404).send("Recipe tag relationships not found.");
  res.send(recipeTags);
});

router.post("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { recipe_id, tag_id } = req.body;

  const recipeTag = new RecipeTag({
    recipe_id: recipe_id,
    tag_id: tag_id,
  });
  try {
    const result = recipeTag.save();
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

  const { recipe_id, tag_id } = req.body;

  try {
    const result = await RecipeTag.findByIdAndUpdate(req.params.id, {
      $set: {
        recipe_id: recipe_id,
        tag_id: tag_id,
      },
    });
    res.send(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
      res.status(400).send(ex.errors[field].message);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const recipeTag = await RecipeTag.findByIdAndDelete(req.params.id);
  if (!recipeTag)
    return res.status(404).send("Recipe tag relationship not found.");
  res.send(recipeTag);
});

module.exports = router;
