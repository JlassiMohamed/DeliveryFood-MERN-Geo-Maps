const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: Number,
  address: { type: String, required: true },
  imageUrl1: { type: String, required: true },
  imageUrl2: { type: String, required: true },
  imageUrl3: { type: String, required: true },
  tags: { type: String, required: true },
  minOrderAmount: Number,
  seller: { type: Schema.Types.ObjectId, ref: "user" },
  items: [{ type: Schema.Types.ObjectId, ref: "item" }],
});

module.exports = Restaurant = model("restaurant", restaurantSchema);
