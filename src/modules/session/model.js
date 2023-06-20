const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM session").then((data) => {
    return data;
  });
};

const findById = (id) => {
  return db
    .execute("SELECT * FROM session WHERE id = ? ", [id])
    .then(([data]) => {
      return data;
    });
};

const findWineBySessionId = (id) => {
    return db
      .execute('SELECT * FROM session_has_wine JOIN session ON session.id = session_has_wine.session_id WHERE session_id = ?', [id])
      .then(([data]) => {
        return data;
      });
  };

module.exports = { findAll, findById, findWineBySessionId };
