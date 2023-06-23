const argon = require("argon2");
const jwt = require("jsonwebtoken");

const { findAll, findById, insert, findByMail, updateOne, updateOneComment, deleteOne } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => console.error(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([user]) => {
      !user ? res.status(400).json("ressource with the specified id does not exist") : res.status(200).json(user);
    })
    .catch((err) => console.error(err));
};

const register = async (req, res) => {
  const { firstname, lastname, email, password, age } = req.body;
  if (!email) {
    res.status(400).send({ error: "Please specify email" });
    return;
  }

  try {
    const result = await insert({ firstname, lastname, email, password, age });
    res.status(201).json({ id: result.insertId, firstname, lastname, email, age });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ error: "Please specify both email and password" });
  }

  try {
    const [user] = await findByMail(email);
    if (!user) {
      res.status(403).json("Invalid email");
    } else {
      const { id, email, password: hash, role } = user;
      if (await argon.verify(hash, password)) {
        const token = jwt.sign({ id: id, role: role }, process.env.JWT_AUTH_SECRET, {
          expiresIn: "1h",
        });
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
            id,
            email,
            role,
          });
      } else {
        res.status(401).send({
          error: "Invalid password",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error server");
  }
};

const logout = (req, res) => {
  return res.clearCookie("access_token").sendStatus(200);
};

const updateUser = (req, res) => {
  const id = req.userId;
  const user = req.body;
  updateOne(user, id)
    .then((user) => {
      if (user.affectedRows === 1) {
        res.status(204).json({ id, ...user });
      } else {
        res.status(404).json("No user found with this ID");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const updateComment = (req, res) => {
  const id = req.userId;
  const comment = req.body;
  updateOneComment(comment, id)
    .then((comment) => {
      if (comment.affectedRows === 1) {
        res.status(204).json({ id, comment });
      } else {
        res.status(404).json("No user found with this ID");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  deleteOne(id)
    .then((result) => {
      res.sendStatus(204).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("error server");
    });
};

module.exports = {
  getAll,
  getById,
  register,
  login,
  logout,
  updateUser,
  updateComment,
  deleteUser,
};
