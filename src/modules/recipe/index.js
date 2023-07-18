const router = require("express").Router();
const { authenticate } = require("../../middlewares/auth");

const {
  getAll,
  getById,
  getSessionByUserId,
  getAllBySession,
} = require("./controller");

router.get("/", getAll);
router.get("/session/:id", getAllBySession);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", authenticate, getById);

module.exports = router;
