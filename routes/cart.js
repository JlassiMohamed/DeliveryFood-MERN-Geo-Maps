const express = require("express");
const router = express.Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemCart,
  deleteCart,
} = require("../controllers/cart");
const isAuth = require("../middlewares/auth_jwt");

router.post("/", isAuth, addItemToCart);//isAuth=>req.user._id<=config(headers)
router.get("/", isAuth, getUserCart);
router.delete("/:productId", isAuth, deleteItemCart);
router.delete("/", isAuth, deleteCart);

module.exports = router;
