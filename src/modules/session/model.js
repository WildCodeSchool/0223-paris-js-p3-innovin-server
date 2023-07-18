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
    "INSERT INTO session (category, date, location_id , price, max_participants) VALUES (?, ?, ?, ?, ?)",
    [category, date, location, price, max_participants]
  );
};

const createUserHasSession = (data) => {
  const { sessionId, userId } = data;
  return db.execute(
    "INSERT INTO session_has_user (user_id, session_id) VALUES (?, ?)",
    [userId, sessionId]
  );
};

const deleteSessionById = (id) => {
  return db.execute("DELETE FROM session WHERE id = ?", [id]);
};

const deleteUserFromSessionById = (data) => {
  const { sessionid, userid } = data;
  return db.execute(
    "DELETE FROM session_has_user WHERE session_id = ? AND user_id = ?",
    [sessionid, userid]
  );
};

const deleteWineFromSessionById = (data) => {
  const { sessionid, wineid } = data;
  return db.execute(
    "DELETE FROM session_has_wine WHERE session_id = ? AND wine_id = ?",
    [sessionid, wineid]
  );
};

module.exports = {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  createNewSession,
  findAllWithNumberOfParticipants,
  deleteSessionById,
  deleteUserFromSessionById,
  deleteWineFromSessionById,
  createUserHasSession,
};
