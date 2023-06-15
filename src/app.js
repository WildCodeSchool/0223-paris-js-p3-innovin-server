require("dotenv").config();
const app = require("./config/server"),
  connection = require("./config/db-config");

app.listen(process.env.APP_PORT, (err) => {
  err ? console.log(err) : console.log(" 🚀 application started on port :" + process.env.APP_PORT);
});
