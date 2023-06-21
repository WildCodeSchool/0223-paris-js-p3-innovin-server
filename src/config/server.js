const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.use(cookieParser());

const recipe_rooter = require("../modules/recipe");
const session_rooter = require("../modules/session");
const tag_rooter = require("../modules/tag");
const user_rooter = require("../modules/user");
const wine_rooter = require("../modules/wine");

app.use("/recipes", recipe_rooter);
app.use("/sessions", session_rooter);
app.use("/tags", tag_rooter);
app.use("/users", user_rooter);
app.use("/wines", wine_rooter);

module.exports = app;
