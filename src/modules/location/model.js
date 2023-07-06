const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM location").then((data) => {
    return data;
  });
};

module.exports = {
  findAll,
};
