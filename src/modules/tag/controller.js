const {findAllWinesTags} = require("./model");

const getAllWinesTags = (req, res) => {
    findAllWinesTags()
    .then(([tags]) => {
      res.status(200).json(tags);
    })
    .catch((err) => console.error(err));
};

module.exports = {
    getAllWinesTags }