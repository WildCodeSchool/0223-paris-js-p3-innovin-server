const { addOne } = require("./model");

const createOne = async (req, res) => {
  const recipe = req.body;
  try {
    for (let i = 0; i < recipe.length; i++) {
      await addOne(recipe[i]);
    }
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  createOne,
};
