const router = require("express").Router();
const { getNotesByUserAndSessionId, addNote } = require("./controller");
const { authenticate } = require("../../middlewares/auth");


router.get("/:id", authenticate, getNotesByUserAndSessionId);
router.post("/:id", authenticate, addNote);

module.exports = router;
