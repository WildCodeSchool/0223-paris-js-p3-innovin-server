const router = require("express").Router();
const { getNotesByUserAndSessionId, addNote, getNoteIdByUser, addNoteHasTag } = require("./controller");
const { authenticate } = require("../../middlewares/auth");



router.get("/user/:wine_id/:session_id", authenticate, getNoteIdByUser);
router.get("/:id", authenticate, getNotesByUserAndSessionId);


router.post("/noteHasTag", authenticate, addNoteHasTag);

router.post("/:id", authenticate, addNote);



module.exports = router;
