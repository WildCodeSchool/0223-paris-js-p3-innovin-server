const db = require("../../config/db-config");

const findAll = () => {
  return db
    .execute(
      "SELECT * from session JOIN location ON session.location_id=location.id"
    )
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
  return db
    .execute(
      "SELECT category, date, session.id, place_name, max_participants, COUNT(user_id) AS participants FROM session LEFT JOIN session_has_user ON session.id = session_has_user.session_id JOIN location on location.id = session.location_id WHERE session.id = ? GROUP BY session.id",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

const findWineBySessionId = (id) => {
  return db
    .execute(
      "SELECT * FROM session_has_wine JOIN wine ON wine.id = session_has_wine.wine_id WHERE session_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

const findUserBySessionId = (id) => {
  return db
    .execute(
      "SELECT user_id, u.firstname, u.lastname,comment FROM session_has_user JOIN user AS u ON u.id = session_has_user.user_id WHERE session_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    });
};

const createNewSession = (session) => {
  const { location, price, category, max_participants, date } = session;
  return db.execute(
    "INSERT INTO session (category, date,location, price, max_participants) VALUES (?, ?, ?, ?, ?)",
    [category, date, location, price, max_participants]
  );
};

const deleteSessionById = (id) => {
  return db.execute("DELETE FROM session WHERE id = ?", [id]);
};

module.exports = {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  createNewSession,
  findAllWithNumberOfParticipants,
  deleteSessionById,
};
