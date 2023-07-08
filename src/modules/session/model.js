const db = require("../../config/db-config");

const findAll = () => {
  return db
    .execute("SELECT *, session.id FROM session JOIN location ON session.location_id=location.id")
    .then((data) => {
      return data;
    });
};

const findById = (id) => {
  return db.execute("SELECT * FROM session WHERE id = ? ", [id]).then(([data]) => {
    return data;
  });
};

const findWineBySessionId = (id) => {
  return db
    .execute(
      "SELECT * FROM session_has_wine JOIN session ON session.id = session_has_wine.session_id JOIN wine ON wine.id = session_has_wine.wine_id WHERE session_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

const findUserBySessionId = (id) => {
  return db
    .execute(
      "SELECT * FROM session_has_user JOIN session ON session.id = session_has_user.session_id JOIN user ON user.id = session_has_user.user_id WHERE session_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

const registerSession = (user_id, session_id) => {
  return db.execute(`INSERT INTO session_has_user (user_id, session_id) VALUES (?,?)`, [user_id, session_id]);
};

module.exports = {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  registerSession,
};
