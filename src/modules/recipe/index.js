const router = require("express").Router();
const { getAll, getSessionByUserId, getById } = require("./controller");
const { authenticate } = require("../../middlewares/auth");


// router.get("/", getAll);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", authenticate, getById);

module.exports = router;
