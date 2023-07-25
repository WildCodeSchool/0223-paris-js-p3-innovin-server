const {
  findNotesByUserAndSessionId,
  AddOne,
  createNote,
  findNoteIdByUser,
  createNoteHasTag,
} = require("./model");

const getNotesByUserAndSessionId = (req, res) => {
  const { id } = req.params;
  findNotesByUserAndSessionId(id, req.userId)
    .then(([notes]) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.error(err));
};

const addNote = async (req, res) => {
  const note = req.body;
  const { id } = req.params;
  const user_id = req.userId;

  try {
    await createNote(note, id, user_id);
    res.status(201).json("note added");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error while adding the note");
  }
};

const addNoteHasTag = async (req, res) => {
  const { note_id, tag_id } = req.body;

  try {
    await createNoteHasTag(note_id, tag_id);
    res.status(201).json("note has tag added");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error while adding the note");
  }
};

const getNoteIdByUser = async (req, res) => {
  const user_id = req.userId;
  const { wine_id } = req.params;
  const session_id = req.params.session_id;

  try {
    const [note_has_tag] = await findNoteIdByUser(wine_id, session_id, user_id);
    res.status(200).json(note_has_tag);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error while adding the note");
  }
};

module.exports = {
  addNote,
  getNoteIdByUser,
  addNoteHasTag,
  getNotesByUserAndSessionId,
};
