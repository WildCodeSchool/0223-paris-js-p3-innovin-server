const router = require("express").Router();
const { createOne, getCreationByUserAndSessionId } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.post("/", authenticate, createOne);
router.get("/:id", authenticate, getCreationByUserAndSessionId);

module.exports = router;
