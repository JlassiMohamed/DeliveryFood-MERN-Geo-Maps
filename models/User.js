const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: Number,
  address: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
});

module.exports = User = model("user", userSchema);
