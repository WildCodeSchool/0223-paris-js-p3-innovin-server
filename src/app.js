require("dotenv").config();
const app = require("./config/server");
const pool = require("./config/db-config");



pool.getConnection().then(()=> {
  console.log("database connected");
  app.listen(process.env.APP_PORT, (err) => {
    err ? console.log(err) : console.log(" 🚀 application started on port :" + process.env.APP_PORT);
  });
}).catch((err) => console.error(err));
