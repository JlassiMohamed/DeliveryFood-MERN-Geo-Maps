const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth_jwt");
const isSeller = require("../middlewares/isSeller");
const {
  get_my_orders,
  checkout,
  get_order,
  update_my_order_status,
  get_seller_orders,
  handle_orders_status,
  removeOrder,
} = require("../controllers/order");

router.post("/:userId", checkout); //, isAuth
router.get("/", isAuth, get_my_orders);
router.get("/:orderId", isAuth, get_order);
router.put("/user/:userId/:orderId", isAuth, update_my_order_status);
router.get("/seller/:restaurantId", isSeller, get_seller_orders);
router.put("/:restaurantId/:orderId", isSeller, handle_orders_status);
router.delete("/:orderId", isSeller, removeOrder); //isAuth,/isSeller,

module.exports = router;
