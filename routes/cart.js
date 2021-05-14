const express = require("express");
const router = express.Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemCart,
} = require("../controllers/cart");
const isAuth = require("../middlewares/auth_jwt");

router.post("/", isAuth, addItemToCart);//isAuth=>req.user
router.get("/", isAuth, getUserCart);
router.delete("/:productId", isAuth, deleteItemCart);

module.exports = router;
