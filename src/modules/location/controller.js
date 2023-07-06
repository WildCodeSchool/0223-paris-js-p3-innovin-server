const { findAll } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
};
