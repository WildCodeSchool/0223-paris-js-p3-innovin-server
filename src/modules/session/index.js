const router = require("express").Router();
const { getAll, getById, getWineBySessionId, getUserBySessionId, addRegistration } = require("./controller");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/:id/register", addRegistration);

module.exports = router;
