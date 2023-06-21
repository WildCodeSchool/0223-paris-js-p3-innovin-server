const argon = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
  if (!req.body.password)
    return res.status(400).json("password field required");
  try {
    const hash = await argon.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json("error server");
  }
};

const authenticate = async (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json("invalid or expired token");
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole === "ROLE_ADMIN") {
    return next();
  } else {
    return res.sendStatus(403);
  }
};

module.exports = {
  hashPassword,
  authenticate,
  isAdmin,
};
