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

module.exports = {
  findRecipeByUserId,
  findRecipeByRecipeId
};
