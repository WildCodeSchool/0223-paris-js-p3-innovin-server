const {findAllWinesTags} = require("./model");
const argon = require("argon2");

 
const {     
    findByCategory, insertIdTag  
} = require("./model");


const getByCategory = (req, res) => { 
  findByCategory()
      .then(([type]) => {
        !type ? res.status(400).json("ressource with the specified type of tag does not exist") : res.status(200).json(type);
      })
      .catch((err) => console.error(err));
  };

const postByIdTag = async (req, res)=>{
  const { tags } = req.body;
 
  try {
    for (let i = 0; i < tags.length; i++) {
      await insertIdTag(req.userId, tags[i]);      
    }
    res.sendStatus(201)

  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err.message,
    });
  }
}

const getAllWinesTags = (req, res) => {
  findAllWinesTags()
  .then(([tags]) => {
    res.status(200).json(tags);
  })
  .catch((err) => console.error(err));
};


  module.exports = {getByCategory, postByIdTag, getAllWinesTags};
