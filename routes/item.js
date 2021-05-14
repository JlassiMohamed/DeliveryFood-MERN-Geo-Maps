const express = require("express");
const router = express.Router();
const isSeller = require("../middlewares/isSeller");
const {
  addItem,
  getItems,
  getItem,
  deleteItem,
  editItem,
} = require("../controllers/item");

router.post("/", isSeller, addItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.delete("/:id", isSeller, deleteItem);
router.put("/:id", isSeller, editItem);

module.exports = router;
