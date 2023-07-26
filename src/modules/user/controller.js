const argon = require("argon2");
const jwt = require("jsonwebtoken");

const {
  findAll,
  findById,
  findByEmail,
  insert,
  updateOne,
  updateOneByMail,
  updateOneComment,
  deleteOne,
  findCurrent,
 } = require("./model");

const {sendResetPasswordMail, sendYourmessage} = require("../../helpers/mailer.js")

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
      !user
        ? res.status(400).json("ressource with the specified id does not exist")
        : res.status(200).json(user);
    })
    .catch((err) => console.error(err));
};

const getCurrentUser = async (req, res, next) => {
  try {    
     const [user] = await findCurrent(req.userId);   
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json("ressource with the specified id does not exist");
  }
};



const register = async (req, res) => {
  console.log(req.body)
  try {
    const {lastName,firstName,birthday, phone,email, password} = req.body;
    const [user] = await findByEmail(req.body.email);
    if (user) return res.status(400).json("email already exists");
    const result = await insert({lastName,firstName,birthday,phone,email, password });
    res.status(201).json({ id: result.insertId, lastName,firstName,birthday,phone,email,password });
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
    return res
      .status(400)
      .send({ error: "Please specify both email and password" });
  }

  try {
    const [user] = await findByEmail(email);
    if (!user) {
      res.status(403).json("Invalid email");
    } else {
      const { id, email, password: hash, role } = user;
      if (await argon.verify(hash, password)) {
        const token = jwt.sign(
          { id: id, role: role },
          process.env.JWT_AUTH_SECRET,
          {
            expiresIn: "6h",
          }
        );
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

const sendResetPassword = async (req, res, next) => {
  const {email} = req.body;
  const [user] = await findByEmail(req.body.email);
  console.log(user)
  if (!user){
    res.status(401).send({
      error: "Invalid email",
    });
  }else{
    try {
        const resetToken = jwt.sign({ email }, process.env.JWT_AUTH_SECRET);
        const url = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;
        await sendResetPasswordMail({ dest: email, url });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
  }
}

const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
      const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
      const hash = await argon.hash(password);
      await updateOneByMail({password: hash}, decoded.email);
      res.sendStatus(204);
  } catch (error) {
      next(error);
  }
}


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
      res.status(204).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};


const sendContact = async (req, res, next) => {
  const {firstName, email, subject , message } = req.body;
    try {
        await sendYourmessage({ firstName, email, subject , message});
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
  }

module.exports = {
  getAll,
  getById,
  register,
  login,
  logout,
  updateUser,
  updateComment,
  deleteUser,
  getCurrentUser,
  sendResetPassword, 
  resetPassword,
  sendContact
};
