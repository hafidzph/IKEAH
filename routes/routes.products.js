const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const app = express();
const Cart = require("../models/Cart");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

router.get("/detail-product/:id", async (req, res) => {
  const data = await Products.findOne({ _id: req.params.id });

  res.render("product-detail", {
    title: "Check Product",
    id: req.params.id,
    data,
    user: req.user.data,
  });
});

router.get("/delete-data/success", async (req, res) => {
  const dataUser = jwt.decode(req.cookies.token);

  Cart.deleteMany({ owner: dataUser.data.username })
    .then((result) => {
      req.flash("msg", "Anda berhasil melakukan checkout");
      res.redirect("/product/mycart/");
    })
    .catch((err) => {
      console.log("Data telah habis");
    });
});

router.get("/mycart/", async (req, res) => {
  if (req.query?.username) {
    const cart = new Cart({
      product_name: req.query.product_title,
      owner: req.query.username,
      color: req.query.color,
      price: req.query.price,
      quantity: req.query.quantity,
      image: req.query.image,
    });
    cart.save().then((result) => {});
  } else {
    const carts = await Cart.find({ owner: req.user.data.username });

    res.render("keranjang", {
      title: "Carts Page",
      user: req.user.data,
      carts,
      msg: req.flash("msg"),
    });
  }
});

router.delete("/mycart/", (req, res) => {
  Cart.deleteOne({ _id: ObjectId(req.body.id) }).then((result) => {
    res.redirect("mycart/");
  });
});

module.exports = router;
