const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
          default: 1,
        },
        imageUrl: {
          type: String,
          default:
            "https://cdn1.iconfinder.com/data/icons/kitchen-food-4/96/pan_soup_storage_cook_food_smell_tasty-512.png",
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Cart = model("cart", CartSchema);
