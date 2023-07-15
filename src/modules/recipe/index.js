const router = require("express").Router();
const { getAll, getSessionByUserId, getById, createOne, getRecipeByUserAndSessionId } = require("./controller");
const { authenticate } = require("../../middlewares/auth");


// router.get("/", getAll);
router.get("/user", authenticate, getSessionByUserId);
router.get("/:id", authenticate, getById);
router.get("/session/:id", authenticate, getRecipeByUserAndSessionId )

router.post("/:id", authenticate, createOne);


module.exports = router;
