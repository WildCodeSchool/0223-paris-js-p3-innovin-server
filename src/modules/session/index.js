const router = require("express").Router();
const { getAll, getById, getWineBySessionId, getUserBySessionId } = require("./controller");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);
router.get("/:id/user", getUserBySessionId);

module.exports = router;
