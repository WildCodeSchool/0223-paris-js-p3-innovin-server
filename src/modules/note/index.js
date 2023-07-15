const router = require("express").Router();
const { getNotesByUserAndSessionId } = require("./controller");
const { authenticate } = require("../../middlewares/auth");


router.get("/:id", authenticate, getNotesByUserAndSessionId);

module.exports = router;
