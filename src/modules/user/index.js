const router = require("express").Router();
const { getAll, getById, register, login, logout } = require("./controller");
const { hashPassword, authenticate, isAdmin } = require("../../middlewares/auth");

router.get("/", authenticate, isAdmin, getAll);
router.get("/logout", authenticate, logout);
router.get("/:id", getById);

router.post("/register", hashPassword, register);
router.post("/login", login);

module.exports = router;
