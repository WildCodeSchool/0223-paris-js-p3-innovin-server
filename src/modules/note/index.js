const router = require("express").Router();
const { addNote,  } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.post("/:id", authenticate, addNote);

module.exports = router;