const { addOne, findBySessionAndUserId } = require("./model");

const createOne = async (req, res) => {
  const recipe = req.body;
  try {
    for (let i = 0; i < recipe.length; i++) {
      await addOne(recipe[i]);
    }
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
    });
  }
};

const getCreationByUserAndSessionId = (req, res) => {
  const { id } = req.params;
  findBySessionAndUserId(id, req.userId)
    .then(([creation]) => {
      res.status(200).json(creation);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  createOne,
  getCreationByUserAndSessionId
};
