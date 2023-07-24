const router = require("express").Router();
const validator = require("../../middlewares/validator");
const userSchema = require("./validator");

const {
  getAll,
  getById,
  register,
  login,
  logout,
  updateUser,
  updateComment,
  deleteUser,
  getCurrentUser,sendResetPassword, resetPassword
} = require("./controller");
const {
  hashPassword,
  authenticate,
  isAdmin,
} = require("../../middlewares/auth");

router.get("/", authenticate, isAdmin, getAll);
router.get("/logout", authenticate, logout);
router.get("/me", authenticate, getCurrentUser);
router.get("/:id", getById);

router.post("/register", validator(userSchema), hashPassword, register);
router.post("/login", login);

router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);

router.put("/:id", authenticate, updateUser);
router.put("/comment", authenticate, updateComment);

router.delete("/:id", authenticate, isAdmin, deleteUser);

module.exports = router;
