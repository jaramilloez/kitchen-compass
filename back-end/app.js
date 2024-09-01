const mongoose = require("mongoose");
const express = require("express");

const cuisines = require("./routes/cuisines");
const users = require("./routes/users");
const recipes = require("./routes/recipes");
const ingredients = require("./routes/ingredients");
const groups = require("./routes/groups");
const categories = require("./routes/categories");

const fetch = require("node-fetch");
global.fetch = fetch;
global.Headers = fetch.Headers || Headers;

const app = express();
require("./routes/cors")(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/categories", categories);
app.use("/api/groups", groups);
app.use("/api/ingredients", ingredients);
app.use("/api/recipes", recipes);
app.use("/api/users", users);
app.use("/api/cuisines", cuisines);

mongoose.connect("mongodb://127.0.0.1/kitchen-compass");

let myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
