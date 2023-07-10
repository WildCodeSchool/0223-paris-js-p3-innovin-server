const router = require("express").Router();
const { getAll, getById, getFavByUserId, deleteFav, AddToFav } = require("./controller");
const { authenticate } = require("../../middlewares/auth");

router.get("/", getAll);
router.get("/favorites", authenticate, getFavByUserId);
router.get("/:id", getById);

router.post("/favorites/:id", authenticate, AddToFav);


router.delete("/favorites/:id", authenticate, deleteFav);


module.exports = router;
