const router = require("express").Router();
const { createOne } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.post("/", authenticate, createOne);

module.exports = router;
