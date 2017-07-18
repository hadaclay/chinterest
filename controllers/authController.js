const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.login = passport.authenticate("twitter");

exports.loginFailure = (req, res, next) => {
  req.flash("is-danger", "Login not successful.");
  next();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  req.flash("is-warning", "You must be logged in to do that!");
  res.redirect("/");
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("is-info", "You are now logged out!");
  res.redirect("/");
};
