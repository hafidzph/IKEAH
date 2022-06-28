const mongoose = require("mongoose");

const Cart = mongoose.model("Cart", {
  product_name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = Cart;
