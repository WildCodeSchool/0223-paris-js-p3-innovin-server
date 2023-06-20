const { findAll, findById } = require("./model");

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

module.exports = { getAll, getById };
