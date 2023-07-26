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
  postUserHasSession,
  postWineHasSession,
  getAllWithNumberOfParticipants,
  getByIdWithNumberOfParticipants,
} = require("./controller");

const { authenticate } = require("../../middlewares/auth");

router.get("/", getAllWithNumberOfParticipants);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", getByIdWithNumberOfParticipants);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/", postNewSession);
router.post("/userhassession", postUserHasSession);
router.post("/winehassession", postWineHasSession);
router.post("/:id/register", authenticate, addRegistration);

router.delete("/:id", deleteSession);
router.delete("/:sessionid/wine/:wineid", deleteWineFromSession);
router.delete("/:sessionid/user/:userid", deleteUserFromSession);

module.exports = router;
