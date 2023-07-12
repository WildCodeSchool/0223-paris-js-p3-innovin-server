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

module.exports = {
  findAll,
  findById,
  findAllBySessionId,
};
