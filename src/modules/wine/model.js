const db = require("../../config/db-config");

const findAll = () => {
    return db.execute("SELECT * FROM wine").then((data) => {
      return data;
    });
  };

  const findById = (id) => {
    return db
      .execute(
        "SELECT wine.name as wine_name, region.name as region_name, wine.image as wine_img, cepage, color, comment, domain, manufacture_year, appellation FROM wine JOIN region ON region.id = wine.region_id WHERE wine.id = ? ",
        [id]
      )
      .then((data) => {
        return data;
      });
  };

  const findFavoritesByUserId = (id) => {
    return db
    .execute(
      "SELECT * FROM user_has_favorite JOIN wine ON wine.id = user_has_favorite.wine_id WHERE user_id = ? ",
      [id]
    )
    .then((data) => {
      return data;
    });
  }



  const deleteOneFav = (userId, wineId) => {
    return db.execute("delete from user_has_favorite WHERE user_id = ? and wine_id = ?", [userId, wineId]).then(([result]) => {
      return result;
    });
  };

  const AddOneToFav = (userId, wineId) => {
    return db.execute(`insert into user_has_favorite (user_id, wine_id) values (?, ?)`, [
      userId,
      wineId,
    ]);
  };
  module.exports = {
    findAll,
    findById,
    findFavoritesByUserId,
    deleteOneFav,
    AddOneToFav
  };