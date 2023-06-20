const router = require("express").Router();
const { getAll, getById, getWineBySessionId } = require("./controller");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/wine", getWineBySessionId);

module.exports = router;
