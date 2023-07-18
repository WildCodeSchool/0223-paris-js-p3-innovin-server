const db = require("../../config/db-config");

const findAll = async () => {
  const data = await db.execute("SELECT * from recipe");
  return data;
};

const findAllBySessionId = async (id) => {
  const data = await db.execute("SELECT * from recipe WHERE session_id = ? ", [
    id,
  ]);
  return data;
};

const findById = (id) => {
  return db
    .execute(
      "SELECT * FROM recipe LEFT JOIN mix_wine ON recipe_id = recipe.id WHERE recipe.id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

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
  findAll,
  findById,
  findAllBySessionId,
  findRecipeByUserId,
  findRecipeByRecipeId,
};
