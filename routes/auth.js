const jwt = require("jsonwebtoken");

const authentification = function (req, res, next) {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, "secretkey");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

const deleteToken = function (req, res, next) {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
  });
  next();
};

module.exports = { authentification, deleteToken };
