const router = require("express").Router();
const { getAllWinesTags } = require("./controller");

router.get("/wines", getAllWinesTags);
module.exports = router;
