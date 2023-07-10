const {
  findAll,
  findById,
  findFavoritesByUserId,
  deleteOneFav,
  AddOneToFav,
} = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([wine]) => {
      res.status(200).json(wine);
    })
    .catch((err) => console.error(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([user]) => {
      !user
        ? res.status(400).json("ressource with the specified id does not exist")
        : res.status(200).json(user);
    })
    .catch((err) => console.error(err));
};

const getFavByUserId = async (req, res) => {
  try {
    const [favorites] = await findFavoritesByUserId(req.userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(400).json("ressource with the specified id does not exist");
  }
};

const deleteFav = (req, res) => {
  const { id } = req.params;
  deleteOneFav(req.userId, id)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("error server");
    });
};

const AddToFav = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AddOneToFav(req.userId, id);
    res.status(201).json({ user : req.userId, wine : id });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  getFavByUserId,
  deleteFav,
  AddToFav,
};
