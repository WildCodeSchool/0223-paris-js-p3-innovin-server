const { findRecipeByUserId, findRecipeByRecipeI, AddOne, findRecipeByUserAndSessionId } = require("./model");

const getSessionByUserId = async (req, res) => {
    try {
      const [recipes] = await findRecipeByUserId(req.userId);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(400).json("ressource with the specified id does not exist");
    }
  }

  const getById = (req, res) => {
    const { id } = req.params;
    findRecipeByRecipeId(id)
      .then(([recipe]) => {
        !recipe
          ? res.status(400).json("ressource with the specified id does not exist")
          : res.status(200).json(recipe);
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

  const getRecipeByUserAndSessionId = (req, res) => {
    const { id } = req.params;
    findRecipeByUserAndSessionId(id, req.userId)
      .then(([recipe]) => {
        res.status(200).json(recipe);
      })
      .catch((err) => console.error(err));
  };

  module.exports = {
    getSessionByUserId,
    getById,
    createOne,
    getRecipeByUserAndSessionId
  };
  