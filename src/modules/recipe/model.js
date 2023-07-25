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
      "SELECT recipe.id, date, place_name, recipe.image, session_id FROM recipe join session on session.id = recipe.session_id join location on location.id = session.location_id where user_id = ?",
      [id]
    )
    .then((data) => {
      return data;
    });
};

findRecipeByRecipeId = (id) => {
  return db
    .execute(
      "SELECT * from note_has_tag join note on note.id = note_has_tag.note_id join tag on tag.id = note_has_tag.tag_id  where session_id = ? and user_id = ?",
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
  findAll,
  findById,
  findAllBySessionId,
  findRecipeByUserId,
  findRecipeByRecipeId,
  AddOne,
  findRecipeByUserAndSessionId
};
