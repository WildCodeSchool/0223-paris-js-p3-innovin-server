const { findAll, findAllCepage } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([sessions]) => {
      res.status(200).json(sessions);
    })
    .catch((err) => console.error(err));
};

const getAllCepage = ({ req, res }) => {
  findAllCepage()
    .then(([sessions]) => {
      res.status(200).json(sessions);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
  getAllCepage,
};
