const cors = require("cors");

modules.exports = function (app) {
  app.user(cors());
};
