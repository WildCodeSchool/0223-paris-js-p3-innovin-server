const {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  createNewSession,
  findAllWithNumberOfParticipants,
  deleteSessionById,
  findSessionByUserId,
} = require("./model");

const getAll = ({ req, res }) => {
  findAllWithNumberOfParticipants()
    .then(([sessions]) => {
      res.status(200).json(sessions);
    })
    .catch((err) => console.error(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([session]) => {
      !session
        ? res.status(400).json("ressource with the specified id do not exist")
        : res.status(200).json(session);
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

const postNewSession = async (req, res) => {
  const infos = req.body;
  try {
    const newSession = await createNewSession(infos);
    res.status(200).json(newSession);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};
const deleteSession = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSessionById(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

const getSessionByUserId = async (req, res) => {
  try {
    const [sessions] = await findSessionByUserId(req.userId);
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(400).json("ressource with the specified id does not exist");
  }
}

module.exports = {
  getAll,
  getById,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  getSessionByUserId
};
