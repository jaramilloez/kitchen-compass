const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose
  .connect("mongodb://localhost/kitchen-compass")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Couldn't connect to MongoDB.", err));

app.use("./api/ingredients", ingredients);
app.use("./api/recipes", recipes);
app.use("./api/users", users);
