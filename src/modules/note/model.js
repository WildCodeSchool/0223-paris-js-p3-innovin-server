const db = require("../../config/db-config");

const createNote = (notes, session_id, user_id) => {
const {wine_id,note }= notes
return db
.execute("INSERT note (wine_id, user_id, session_id, note ) VALUES (?, ?, ?, ?)", [wine_id, user_id,session_id, note ])

}

exports.createNote = createNote;