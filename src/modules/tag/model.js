const db = require("../../config/db-config");

const findAllWinesTags = () => {
    return db
      .execute(
        "SELECT * from tag WHERE type_of_tag = 'wine'"
      )
      .then((data) => {
        return data;
      });
  };

  module.exports = {
    findAllWinesTags }