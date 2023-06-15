const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());

const recipe_rooter = require("../modules/recipe");
const session_rooter = require("../modules/session");
const tag_rooter = require("../modules/tag");
const user_rooter = require("../modules/user");
const wine_rooter = require("../modules/wine");

app.use("/recipe", recipe_rooter);
app.use("/session", session_rooter);
app.use("/tag", tag_rooter);
app.use("/user", user_rooter);
app.use("/wine", wine_rooter);

module.exports = app;
