const router = require("express").Router();
const { getAll, getById, getAllBySession } = require("./controller");

router.get("/", getAll);
router.get("/session/:id", getAllBySession);
router.get("/:id", getById);

module.exports = router;
