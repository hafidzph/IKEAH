const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const api = require("./api/api-products");
const routesSet = require("./routes/routes.users");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const Products = require("./models/products");
const { authentification, deleteToken } = require("./routes/auth");
const { cookie } = require("express/lib/response");
const routeProducts = require("./routes/routes.products");
const adminRoutes = require("./routes/routes.admin");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//set Templating-engine to ejs
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

//middle-ware post
app.use(express.urlencoded({ extended: true }));

//middle-ware mengatur public
app.use(express.static("public"));

//set flash-message

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use("/product", authentification, routeProducts);
app.use("", adminRoutes);
app.get("/dashboard", authentification, async (req, res) => {
  const data = await Products.findOne({ product_name: "Sofa Lembut" });

  res.render("dashboard", {
    title: "Halaman Dashboard",
    data,
    user: req.user.data,
  });
});
app.use("", routesSet);
//Halaman Utama
app.get("/", async (req, res) => {
  const data = await Products.findOne({ product_name: "Sofa Lembut" });
  if (req.cookies.token) {
    res.redirect("/dashboard");
  } else {
    res.render("index", {
      title: "Halaman Dashboard",
      data,
    });
  }
});

app.get("/about", (req, res) => {
  if (req.cookies.token) {
    const data = jwt.decode(req.cookies.token);
    res.render("about-us", {
      title: "Tentang kami",
      user: data.data,
    });
  } else {
    res.render("about-us", {
      title: "Tentang kami",
      user: {},
    });
  }
});

app.get("/products", async (req, res, next) => {
  const products = await Products.find();

  if (req.cookies.token) {
    const data = jwt.decode(req.cookies.token);
    console.log(products);
    res.render("product", {
      title: products.price,
      products,
      user: data.data,
    });
  } else {
    res.render("product", {
      title: "Our Products",
      products,
      user: {},
    });
  }
});

app.post("/products", async (req, res) => {
  const products = await Products.find({
    product_name: { $regex: req.body.quote, $options: "i" },
  });
  if (req.cookies.token) {
    const data = jwt.decode(req.cookies.token);

    res.render("product", {
      title: products.price,
      products,
      user: data.data,
    });
  } else {
    res.render("product", {
      title: "Our Products",
      products,
      user: {},
    });
  }
});

//About  user's login and register

//API
app.use("/api/products", api);

app.use("/", (req, res) => {
  res.status(404).render("404", {
    title: "Halaman tidak ditemukan",
  });
});

//Admin Section

app.listen(port, () => {
  console.log("Server is listening");
});
