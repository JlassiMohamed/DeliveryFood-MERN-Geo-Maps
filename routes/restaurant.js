const express = require("express");
const router = express.Router();
const isSeller = require("../middlewares/isSeller");
const {
  addRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  editRestaurant,
} = require("../controllers/restaurant");

router.post("/", isSeller, addRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.delete("/:id", isSeller, deleteRestaurant);
router.put("/:id", editRestaurant); //isSeller, 

module.exports = router;
