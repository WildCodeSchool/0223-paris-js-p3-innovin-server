const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM region").then((data) => {
    return data;
  });
};

const findAllCepage = () => {
  return db.execute(
    "SELECT color, name, region_id, cepage_id FROM cepage JOIN region_has_cepage rhc ON rhc.cepage_id = cepage.id"
  );
};

module.exports = {
  findAll,
  findAllCepage,
};
