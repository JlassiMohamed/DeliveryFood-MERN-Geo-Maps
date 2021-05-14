const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: String,
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
  // shopper: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = Item = model("item", itemSchema);
