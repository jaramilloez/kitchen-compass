const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const categories = require("./routes/category");
const groups = require("./routes/groups");
const ingredients = require("./routes/ingredients");
const recipes = require("./routes/recipes");
const users = require("./routes/users");

global.fetch = fetch;
global.Headers = fetch.Headers || Headers;

const app = express();
app.use(express.json());
app.use("./api/categories", categories);
app.use("./api/groups", groups);
app.use("./api/ingredients", ingredients);
app.use("./api/recipes", recipes);
app.use("./api/users", users);

mongoose.connect("mongodb://localhost:27017/kitchen-compass");

let myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
