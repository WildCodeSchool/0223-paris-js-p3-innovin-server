const router = require("express").Router();
const {
  getAll,
  getById,
  getFavByUserId,
  deleteFav,
  AddToFav,
  deleteWine,
  updateWine,
} = require("./controller");
const { authenticate, isAdmin } = require("../../middlewares/auth");

router.get("/", getAll);
router.get("/favorites", authenticate, getFavByUserId);
router.get("/:id", getById);

router.post("/favorites/:id", authenticate, AddToFav);

router.delete("/favorites/:id", authenticate, deleteFav);
router.delete("/:id", authenticate, isAdmin, deleteWine);

router.put("/", authenticate, isAdmin, updateWine);

module.exports = router;
