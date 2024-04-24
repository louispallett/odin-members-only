const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in", { title: "Sign In" });
});

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard", { title: "Dashboard" });
});

router.post("/sign-up", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedpassword,
        member: false,
      });
      await user.save();
      res.redirect("/dashboard");
    })
  } catch(err) {
    return next(err);
  }
});

module.exports = router;
