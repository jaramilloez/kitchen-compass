const express = require("express");

const categories = require("./routes/category");
const groups = require("./routes/groups");
const ingredients = require("./routes/ingredients");
const recipes = require("./routes/recipes");
const users = require("./routes/users");

const app = express();
app.use(express.json());
app.use("./api/categories", categories);
app.use("./api/groups", groups);
app.use("./api/ingredients", ingredients);
app.use("./api/recipes", recipes);
app.use("./api/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
