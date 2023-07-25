const db = require("../../config/db-config");

const addOne = (recipe) => {
  const { recipeId, wineId, percent } = recipe;
  return db.execute(
    `insert mix_wine (recipe_id, wine_id, percent_wine) values (?, ?, ?)`,
    [recipeId, wineId, percent]
  );
};

const findBySessionAndUserId = (sessionId, userId) => {
  return db
    .execute(
      "SELECT wine.name as wine, wine.id as wine_id, tag.name as tag, tag.category, sub_category, percent_wine, wine.image as wine_img, note, date, place_name, location.image as session_img from note join wine on wine.id = note.wine_id join user on user.id = note.user_id join session on session.id = note.session_id join mix_wine mw on mw.wine_id = note.wine_id join recipe on recipe.id = mw.recipe_id join note_has_tag nht on nht.note_id = note.id join tag on tag.id = nht.tag_id join location on location.id = session.location_id  where note.session_id = ? and note.user_id = ? and recipe.user_id = ? and recipe.session_id = ?",
      [sessionId, userId, userId, sessionId]
    )
    .then((data) => {
      return data;
    });
};

module.exports = {
  addOne,
  findBySessionAndUserId,
};
