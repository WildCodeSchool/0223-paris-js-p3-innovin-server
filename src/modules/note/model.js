const db = require("../../config/db-config");

const findNotesByUserAndSessionId = (sessionId, userId) => {
  return db
    .execute(
      "SELECT tag.name as tag, wine.name as wine, note, wine_id from note_has_tag JOIN tag on tag.id = note_has_tag.tag_id JOIN note ON note.id = note_has_tag.note_id JOIN wine ON wine.id = note.wine_id WHERE session_id = ? and user_id = ? ORDER BY note DESC;",
      [sessionId, userId]
    )
    .then((data) => {
      return data;
    });
};

const AddOne = (userId, sessionId) => {
    return db.execute(`insert recipe (user_id, session_id) values (?, ?)`, [
      userId,
      sessionId,
    ]);
  };

module.exports = {
    findNotesByUserAndSessionId,
    AddOne
};
