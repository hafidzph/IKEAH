const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authentification: auth, deleteToken } = require("./auth");
const cookieParser = require("cookie-parser");
const { cookie } = require("express/lib/response");
app.use(cookieParser());
router.get("/login", (req, res, next) => {
  if (req.cookies.token) {
    res.redirect("/dashboard");
  } else {
    res.render("login", {
      title: "Silahkan login",
      msg: req.flash("msg"),
    });
  }
});
router.post("/login", async (req, res, next) => {
  const data = await User.findOne({ username: req.body.username }).lean();

  if (data && req.body.password === data?.password) {
    delete data.password;
    const token = jwt.sign({ data }, "secretkey", { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: false,
    });
    res.redirect("/dashboard");
  } else {
    req.flash("msg", "Username atau password salah");
    res.redirect("/login");
  }
});

//Register Section
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Halaman register",
    msg: req.flash("msg"),
  });
});

router.post("/register", async (req, res) => {
  if (req.body.password !== req.body.repeatpass) {
    req.flash("msg", "Password tidak cocok!");
    res.redirect("/register");
  }

  const user = await User.findOne({ username: req.body.username });

  if (user) {
    console.log(user);
    req.flash(
      "msg",
      "Register gagal, data username atau email telah digunakan!"
    );

    res.redirect("/register");
  } else {
    const data = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    data.save().then((result) => {
      req.flash("msg", "Data Berhasil dibuat");
      res.redirect("/login");
    });
  }
});

//logout and destroy cookie

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
