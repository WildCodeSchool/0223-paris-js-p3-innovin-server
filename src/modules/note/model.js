const db = require("../../config/db-config");

const findNotesByUserAndSessionId = (sessionId, userId) => {
  return db
    .execute(
      "SELECT tag.name as tag, category, wine.name as wine, color, note, wine_id from note_has_tag JOIN tag on tag.id = note_has_tag.tag_id JOIN note ON note.id = note_has_tag.note_id JOIN wine ON wine.id = note.wine_id WHERE session_id = ? and user_id = ? ORDER BY note DESC",
      [sessionId, userId]
    )
    .then((data) => {
      return data;
    });
};

module.exports = {
  findNotesByUserAndSessionId,
};
