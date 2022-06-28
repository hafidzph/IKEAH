const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.post("/admin/login", (req, res) => {
  if (req.body.username === "adminikeah") {
    res.redirect("/admin/show-admin-products");
  } else {
    res.redirect("/admin/login");
  }
});

router.delete("/admin/show-admin-products", (req, res) => {
  Products.deleteOne({ _id: req.body.id }).then((result) => {
    req.flash("msg", "Data berhasil dihapus");
    res.redirect("/admin/show-admin-products");
  });
});

router.get("/admin/login", (req, res) => {
  res.render("login-admin", {
    title: "Masuk sebagai admin",
  });
});

router.get("/admin/add-product", (req, res) => {
  res.render("add-product", {
    title: "Add more products",
    user: {
      username: "Admin",
    },
  });
});

router.post("/admin/add-product", (req, res) => {
  const data = new Products({
    product_name: req.body.product_name,
    price: req.body.price,
    advantage: req.body.advantage,
    material: req.body.material,
    weight: req.body.weight,
    desc: req.body.desc,
    image: req.body.image,
  });

  data
    .save()
    .then((result) => {
      req.flash("Data berhasil disimpan");
      res.redirect("/admin/show-admin-products");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/admin/show-admin-products", async (req, res) => {
  const products = await Products.find();
  res.render("show-products-admin", {
    title: "Products Page",
    user: {
      username: "Admin",
    },
    products,
    msg: req.flash("msg"),
  });
});

router.put("/admin/update-product", (req, res) => {
  Products.updateOne(
    { _id: req.body.id },
    {
      $set: {
        product_name: req.body.product_name,
        price: req.body.price,
        advantage: req.body.advantage,
        material: req.body.material,
        weight: req.body.weight,
        desc: req.body.desc,
        image: req.body.image,
      },
    }
  ).then((result) => {
    req.flash("msg", "Data berhasil diupdate");
    res.redirect("/admin/show-admin-products");
  });
});

router.get("/admin/update-product/:id", async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });

  res.render("update-product", {
    title: "Update product",
    user: {
      username: "Admin",
    },
    product,
  });
});

module.exports = router;
