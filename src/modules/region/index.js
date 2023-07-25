const router = require("express").Router();

const { getAll, getAllCepage } = require("./controller");

router.get("/", getAll);
router.get("/cepages/", getAllCepage);

module.exports = router;
