const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname + "/../../public")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(cookieParser());

const recipe_rooter = require("../modules/recipe");
const session_rooter = require("../modules/session");
const tag_rooter = require("../modules/tag");
const user_rooter = require("../modules/user");
const wine_rooter = require("../modules/wine");
const location_rooter = require("../modules/location");
const note_rooter = require("../modules/note");
const creation_rooter = require("../modules/creation");


app.use("/recipes", recipe_rooter);
app.use("/sessions", session_rooter);
app.use("/tags", tag_rooter);
app.use("/users", user_rooter);
app.use("/wines", wine_rooter);
app.use("/locations", location_rooter);
app.use("/notes", note_rooter);
app.use("/creations", creation_rooter);


module.exports = app;
