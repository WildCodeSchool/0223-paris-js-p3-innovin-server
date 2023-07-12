const db = require("../../config/db-config");

const findAll = () => {
  return db
    .execute("SELECT *, session.id FROM session JOIN location ON session.location_id=location.id")
    .then((data) => {
      return data;
    });
};
const findAllWithNumberOfParticipants = () => {
  return db
    .execute(
      "SELECT category, date, session.id, place_name, max_participants, COUNT(user_id) AS participants FROM session LEFT JOIN session_has_user ON session.id = session_has_user.session_id JOIN location on location.id = session.location_id GROUP BY session.id"
    )
    .then((data) => {
      return data;
    });
};

const findById = (id) => {
  return db.execute("SELECT * FROM session WHERE id = ? ", [id]).then(([data]) => {
    return data;
  });
};

const findSessionsByUserId = (user_id) => {
  return db.execute("SELECT session_id FROM session_has_user WHERE user_id=? ", [user_id]).then((data) => {
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

const createNewSession = (session) => {
  const { location, price, category, max_participants, date } = session;
  return db.execute("INSERT INTO session (category, date,location, price, max_participants) VALUES (?, ?, ?, ?, ?)", [
    category,
    date,
    location,
    price,
    max_participants,
  ]);
};

const deleteSessionById = (id) => {
  return db.execute("DELETE FROM session WHERE id = ?", [id]);
};

const getUserSessionsBySessionId = (user_id, session_id) => {
  return db.execute("Select * from session_has_user where user_id = ? and session_id =?", [user_id, session_id]);
};

module.exports = {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  registerSession,
  createNewSession,
  findAllWithNumberOfParticipants,
  deleteSessionById,
  getUserSessionsBySessionId,
  findSessionsByUserId,
};
