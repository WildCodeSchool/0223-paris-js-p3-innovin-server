const router = require("express").Router();
const {
  getAll,
  getById,
  getWineBySessionId,
  getUserBySessionId,
  postNewSession,
  deleteSession,
  deleteUserFromSession,
  deleteWineFromSession,
  postUserHasSession,
} = require("./controller");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/", postNewSession);
router.post("/userhassession", postUserHasSession);

router.delete("/:id", deleteSession);
router.delete("/:sessionid/wine/:wineid", deleteWineFromSession);
router.delete("/:sessionid/user/:userid", deleteUserFromSession);

module.exports = router;
