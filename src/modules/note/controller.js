const { findNotesByUserAndSessionId, AddOne } = require("./model");

const getNotesByUserAndSessionId = (req, res) => {
  const { id } = req.params;
  findNotesByUserAndSessionId(id, req.userId)
    .then(([notes]) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.error(err));
};

const createOne = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await AddOne(req.userId, id);
      res.status(201).json({ user : req.userId, session : id });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: error.message,
      });
    }
  };

module.exports = {
  getNotesByUserAndSessionId,
  createOne
};
