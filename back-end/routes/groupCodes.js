const express = require("express");

const { GroupCode, validate, generateCode } = require("../models/groupCodes");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const groupCode = await GroupCode.findById(req.params.id);
  res.send(groupCode);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await GroupCode.findOne({ code });
  }

  const groupCode = new GroupCode({
    code: code,
  });

  try {
    const result = await groupCode.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let code;
  let duplicate;
  while (code === duplicate) {
    code = generateCode(6);
    duplicate = await GroupCode.findOne({ code });
  }

  const groupCode = await GroupCode.findByIdAndUpdate(req.params.id, {
    $set: {
      code: code,
    },
  });
  if (!groupCode) return res.status(404).send("Group code not found.");
  res.send(groupCode);
});

router.delete("/:id", async (req, res) => {
  const groupCode = await GroupCode.findByIdAndDelete(req.params.id);
  if (!groupCode) return res.status(404).send("Group code not found.");
  res.send(groupCode);
});

module.exports = router;
