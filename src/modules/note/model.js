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

const createNote = (notes, session_id, user_id) => {
  const { wine_id, note } = notes;
  return db.execute(
    "INSERT note (wine_id, user_id, session_id, note ) VALUES (?, ?, ?, ?)",
    [wine_id, user_id, session_id, note]
  );
};

const createNoteHasTag = (note_id,tag_id) => {
    return db
    .execute("INSERT INTO note_has_tag (note_id, tag_id ) VALUES (?, ?)", [note_id, tag_id])
    
    }

const findNoteIdByUser = (wine_id, session_id, user_id) => {
    return db
    .execute("SELECT * FROM note WHERE wine_id=? AND session_id=? AND user_id=? ", [wine_id, session_id, user_id ])
    
    }


    module.exports= {
        findNoteIdByUser, createNote, createNoteHasTag, findNotesByUserAndSessionId,
        createNote,
    }
