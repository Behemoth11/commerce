require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const User = require("../models/user.js");

const attachUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next();
  }

  const token = authorization.slice(7);

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next();
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({ message: "Insufficient role" });
  }
  next();
};

module.exports = {
  attachUser,
  requireAdmin,
};
