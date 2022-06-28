const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  advantage: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = Product;
