const router = require("express").Router();
const { addNote, getNoteIdByUser, addNoteHasTag } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.get("/user/:wine_id/:session_id", authenticate, getNoteIdByUser);

router.post("/noteHasTag", authenticate, addNoteHasTag);

router.post("/:id", authenticate, addNote);


module.exports = router;