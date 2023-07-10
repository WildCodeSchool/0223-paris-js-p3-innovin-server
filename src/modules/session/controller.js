const { findAll, findById, findWineBySessionId, findUserBySessionId, registerSession } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([sessions]) => {
      res.status(200).json(sessions);
    })
    .catch((err) => console.error(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([session]) => {
      !session ? res.status(400).json("ressource with the specified id do not exist") : res.status(200).json(session);
    })
    .catch((err) => console.error(err));
};

const getWineBySessionId = (req, res) => {
  const { id } = req.params;
  findWineBySessionId(id)
    .then((wines) => {
      res.status(200).json(wines);
    })
    .catch(() => {
      res.status(500).json("erreur serveur");
    });
};

const getUserBySessionId = (req, res) => {
  const { id } = req.params;
  findUserBySessionId(id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json("erreur serveur");
    });
};

const addRegistration = (req, res) => {
  const user_id = req.userId;
  const session_id = req.params.id;
  registerSession(user_id, session_id)
    .then((comment) => {
      if (comment.affectedRows === 1) {
        res.status(204).json({ comment });
      } else {
        res.status(404).json("No user found with this ID");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

module.exports = { getAll, getById, getWineBySessionId, getUserBySessionId, addRegistration };
