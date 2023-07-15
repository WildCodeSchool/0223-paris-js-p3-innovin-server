const router = require("express").Router();
const { getAll, getRecipeByUserId, getById, createOne, getRecipeByUserAndSessionId } = require("./controller");
const { authenticate } = require("../../middlewares/auth");


// router.get("/", getAll);
router.get("/user", authenticate, getRecipeByUserId);
router.get("/:id", authenticate, getById);
router.get("/session/:id", authenticate, getRecipeByUserAndSessionId )

router.post("/:id", authenticate, createOne);


module.exports = router;
