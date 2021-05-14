const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: String,
  },
  products: [
    {
      _id: false,
      productId: String,
      restaurantId: String,
      name: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["placed", "cancelled", "accepted", "completed", "out for delivery"],
  },
  user: {
    // _id: false,
    name: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  restaurant: {
    // _id: false,
    title: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);

// status = ["placed", "cancelled", "accepted", "out for delivery", "completed"];
