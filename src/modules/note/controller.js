const { findNotesByUserAndSessionId, AddOne } = require("./model");

const getNotesByUserAndSessionId = (req, res) => {
  const { id } = req.params;
  findNotesByUserAndSessionId(id, req.userId)
    .then(([notes]) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.error(err));
};


module.exports = {
  getNotesByUserAndSessionId,
};
