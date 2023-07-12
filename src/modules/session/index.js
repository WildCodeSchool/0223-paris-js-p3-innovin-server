const router = require("express").Router();

const { authenticate } = require("../../middlewares/auth");
const {
  getAll,
  getById,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  addRegistration,
  getSessionsByUserId,
} = require("./controller");

router.get("/", getAll);
router.get("/registered", authenticate, getSessionsByUserId);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/", postNewSession);
router.post("/:id/register", authenticate, addRegistration);

router.delete("/:id", deleteSession);

module.exports = router;
