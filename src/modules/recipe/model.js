const db = require("../../config/db-config");

findRecipeByUserId = (id) => {
  return db
    .execute(
      "SELECT recipe.id, date, place_name, recipe.image FROM recipe join session on session.id = recipe.session_id join location on location.id = session.location_id where user_id = ?",
      [id]
    )
    .then((data) => {
      return data;
    });
};

findRecipeByRecipeId = (id) => {
  return db
    .execute(
      "SELECT * FROM mix_wine mw join wine on wine.id = mw.wine_id join recipe on recipe.id = mw.recipe_id where recipe_id = ?",
      [id]
    )
    .then((data) => {
      return data;
    });
};

findRecipeByUserAndSessionId = (sessionId, userId) => {
  return db
  .execute(
    "SELECT recipe.id from recipe WHERE session_id = ? and user_id = ?",
    [sessionId, userId]
  )
  .then((data) => {
    return data;
  });
}

const AddOne = (userId, sessionId) => {
  return db.execute(`insert recipe (user_id, session_id) values (?, ?)`, [
    userId,
    sessionId,
  ]);
};

module.exports = {
  findRecipeByUserId,
  findRecipeByRecipeId,
  AddOne,
  findRecipeByUserAndSessionId
};
