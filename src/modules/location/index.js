const router = require("express").Router();
const { getAll } = require("./controller");

router.get("/", getAll);

module.exports = router;
