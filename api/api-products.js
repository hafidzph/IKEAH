const express = require("express");
const router = express.Router();
require("../utils/db.connection");
const Product = require("../models/products");
router.use(express.json());

//show all list of products
router.get("/show-products", async (req, res) => {
  const dataProduct = await Product.find();
  res.send(dataProduct);
});

//Add Data to Database and show it to API(POST METHOD)
router.post("/add-product", (req, res) => {
  const data = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    advantage: req.body.kelebihan,
    material: req.body.bahan,
    weight: req.body.berat,
    desc: req.body.desc,
    image: req.body.image,
  });

  data
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Delete Data based on its ID
router.delete("/delete-product/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send({
        message: "Data deleted",
      });
    })
    .catch((err) => {
      res.send({
        message: err,
      });
    });
});

router.put("/update-product/:id", (req, res) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        product_name: req.body.product_name,
        price: req.body.price,
        advantage: req.body.kelebihan,
        material: req.body.bahan,
        weight: req.body.berat,
        desc: req.body.desc,
        image: req.body.image,
      },
    }
  ).then((result) => {
    res.send({ data: result });
  });
});

module.exports = router;
