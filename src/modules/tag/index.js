const router = require("express").Router();
const { getAllWinesTags } = require("./controller");


const { authenticate } = require("../../middlewares/auth");
const { getByCategory, postByIdTag } = require("./controller");


router.get("/category", getByCategory);
router.post("/sendTags",authenticate, postByIdTag);

router.get("/wines", getAllWinesTags);

module.exports = router;
