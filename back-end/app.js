const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use("./api/ingredients", ingredients);
app.use("./api/recipes", recipes);
app.use("./api/users", users);

mongoose.connect("");
