const router = require("express").Router();
const { getAll, getById, getWineBySessionId, getUserBySessionId, addRegistration } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

router.post("/:id/register", authenticate, addRegistration);

module.exports = router;
