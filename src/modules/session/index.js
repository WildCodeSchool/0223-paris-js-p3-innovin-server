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
} = require("./controller");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);
router.post("/", postNewSession);
router.delete("/:id", deleteSession);

router.post("/:id/register", authenticate, addRegistration);

module.exports = router;
