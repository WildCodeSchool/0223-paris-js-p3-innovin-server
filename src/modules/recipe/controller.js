const { findAll, findById, findAllBySessionId } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([recipes]) => {
      res.status(200).json(recipes);
    })
    .catch((err) => console.error(err));
};

const getAllBySession = (req, res) => {
  const { id } = req.params;
  findAllBySessionId(id)
    .then(([recipes]) => {
      !recipes
        ? res.status(400).json("ressource with the specified id does not exist")
        : res.status(200).json(recipes);
    })
    .catch((err) => console.error(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([recipe]) => {
      !recipe
        ? res.status(400).json("ressource with the specified id does not exist")
        : res.status(200).json(recipe);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
  getById,
  getAllBySession,
};
