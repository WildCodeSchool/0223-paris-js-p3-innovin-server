const db = require("../../config/db-config");

const addOne = (recipe) => {
    const {recipeId, wineId, percent} = recipe
    return db.execute(`insert mix_wine (recipe_id, wine_id, percent_wine) values (?, ?, ?)`, [
      recipeId,
      wineId,
      percent
    ]);
  };

  const findBySessionAndUserId = (sessionId, userId) => {
    return db
    .execute(
      "SELECT wine.name as wine, wine.id as wine_id, tag.name as tag, tag.category, sub_category, percent_wine, wine.image as wine_img, note, date, place_name, location.image as session_img from note_has_tag join note on note.id = note_has_tag.note_id join tag on tag.id = note_has_tag.tag_id  join wine on wine.id= note.wine_id join mix_wine on mix_wine.wine_id = wine.id join session on session.id = note.session_id  join location on location.id = session.location_id where session_id = ? and user_id = ? ORDER BY note DESC",
      [sessionId, userId]
    )
    .then((data) => {
      return data;
    });
  }

module.exports = {
    addOne,
    findBySessionAndUserId
};
