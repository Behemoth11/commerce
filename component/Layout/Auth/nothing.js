const ObjectId = require("mongodb").ObjectId;
const User = requrie("../models/user.js");
const express = require("express");
const router = express.Router();

router
  .route("/login")
  .post(
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/profile");
    }
  );

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

router.route("/register").post(
  async (req, res, next) => {
    let error;
    const hash = bcrypt.hashSync(req.body.password, 12);
    const user = await User.findOne({ username: req.body.username }).catch(
      (err) => (error = err)
    );

    if (error) {
      next(err);
    } else if (user) {
      res.redirect("/");
    } else {
      const user = User.create({
        username: req.body.username,
        password: hash,
      }).catch((err) => (error = err));
      console.log(user);
      next(null);
    }
  },
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/profile");
  }
);

router.route("/auth/github").get(passport.authenticate("github"));
router
  .route("/auth/github/callback")
  .get(
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
      req.session.user_id = req.user.id;
      res.redirect("/chat");
    }
  );

router.use((req, res, next) => {
  res.status(404).type("text").send("Not Found");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

const ObjectId = require("mongodb").ObjectId;
const User = require("../_api/models/user.js");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

r