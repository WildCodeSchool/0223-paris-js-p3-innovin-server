const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM wine").then((data) => {
    return data;
  });
};

const findById = (id) => {
  return db
    .execute("SELECT * FROM wine WHERE wine.id = ? ", [id])
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
};

const deleteOneFav = (userId, wineId) => {
  return db
    .execute(
      "delete from user_has_favorite WHERE user_id = ? and wine_id = ?",
      [userId, wineId]
    )
    .then(([result]) => {
      return result;
    });
};

const AddOneToFav = (userId, wineId) => {
  return db.execute(
    `insert into user_has_favorite (user_id, wine_id) values (?, ?)`,
    [userId, wineId]
  );
};

const deleteOne = async (id) => {
  const [result] = await db.execute("delete from wine WHERE id = ?", [id]);
  return result;
};
const updateOne = async (wine) => {
  const {
    name,
    color,
    manufacture_year,
    domain,
    region,
    appellation,
    cepage,
    image,
    comment,
    id,
  } = wine;
  const [result] = await db.execute(
    "UPDATE wine SET name = ?, color = ?, manufacture_year = ?, `domain` = ?, region = ?, appellation = ?,  cepage = ? , image = ?, comment = ? WHERE id = ?",
    [
      name,
      color,
      manufacture_year,
      domain,
      region,
      appellation,
      cepage,
      image,
      comment,
      id,
    ]
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  findFavoritesByUserId,
  deleteOneFav,
  AddOneToFav,
  deleteOne,
  updateOne,
};
