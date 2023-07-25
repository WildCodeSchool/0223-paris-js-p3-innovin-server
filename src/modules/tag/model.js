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

    
const findByCategory = () => {
    return db
      .execute(
        "SELECT * FROM tag WHERE type_of_tag = 'User' "

      )
      .then((data) => {
        return data;
      });
  };


  const insertIdTag = (userId, tagsId) => {
    return db.execute(`insert into user_has_tag (user_id, tag_id) values (?, ?)`, [
      userId, tagsId
    ]);
  };
  

  module.exports = {
    findByCategory, insertIdTag,  findAllWinesTags
  };
