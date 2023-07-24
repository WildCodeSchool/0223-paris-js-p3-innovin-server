const {
  findAll,
  findById,
  findWineBySessionId,
  findUserBySessionId,
  registerSession,
  createNewSession,
  findAllWithNumberOfParticipants,
  findByIdWithNumberOfParticipants,
  deleteSessionById,
  getUserSessionsBySessionId,
  findSessionByUserId,
  createUserHasSession,
  createWineHasSession,
} = require("./model");

const getAllWithNumberOfParticipants = ({ req, res }) => {
  findAllWithNumberOfParticipants()
    .then(([sessions]) => {
      res.status(200).json(sessions);
    })
    .catch((err) => console.error(err));
};

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
      !session
        ? res.status(400).json("ressource with the specified id do not exist")
        : res.status(200).json(session);
    })
    .catch((err) => console.error(err));
};

const getByIdWithNumberOfParticipants = (req, res) => {
  const { id } = req.params;
  findByIdWithNumberOfParticipants(id)
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

const getSessionByUserId = async (req, res) => {
  try {
    const [sessions] = await findSessionByUserId(req.userId);
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(400).json("ressource with the specified id does not exist");
  }
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

  getUserSessionsBySessionId(user_id, session_id).then(([session]) => {
    console.log(session);
    if (session[0]) return res.status(400).json("Allready registered");
    registerSession(user_id, session_id)
      .then((comment) => {
        if (comment[0].affectedRows === 1) {
          res.sendStatus(204);
        } else {
          console.error("Wrong session id");
          res.status(400).json("bad credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json("error server");
      });
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

const postUserHasSession = async (req, res) => {
  try {
    const newUserHasSession = await createUserHasSession(req.body);
    res.status(200).json(newUserHasSession);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

const postWineHasSession = async (req, res) => {
  try {
    const newWineHasSession = await createWineHasSession(req.body);
    res.status(200).json(newWineHasSession);
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

const deleteUserFromSession = async (req, res) => {
  try {
    await deleteUserFromSessionById(req.params);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
};

const deleteWineFromSession = async (req, res) => {
  try {
    await deleteWineFromSessionById(req.params);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByIdWithNumberOfParticipants,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  addRegistration,
  getAllWithNumberOfParticipants,
  getSessionByUserId,
  deleteUserFromSession,
  deleteWineFromSession,
  postUserHasSession,
  postWineHasSession,
};
