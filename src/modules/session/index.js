const router = require("express").Router();
const {
  getAll,
  getById,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  getSessionByUserId,
} = require("./controller");

const { authenticate } = require("../../middlewares/auth");

router.get("/", getAll);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);
router.post("/", postNewSession);
router.delete("/:id", deleteSession);

module.exports = router;
