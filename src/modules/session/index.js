const router = require("express").Router();

const {
  getAll,
  getById,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  addRegistration,
  getSessionByUserId,
  deleteUserFromSession,
  deleteWineFromSession,
} = require("./controller");

const { authenticate } = require("../../middlewares/auth");

router.get("/", getAll);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/", postNewSession);
router.post("/:id/register", authenticate, addRegistration);

router.delete("/:id", deleteSession);
router.delete("/:sessionid/wine/:wineid", deleteWineFromSession);
router.delete("/:sessionid/user/:userid", deleteUserFromSession);

module.exports = router;
