const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Message = require("../models/message");
const User = require("../models/user");

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in", { title: "Sign In" });
});

router.get("/dashboard", asyncHandler(async (req, res, next) => {
  const [messages, authors] = await Promise.all([
    Message.find().sort({ date:-1 }).exec(),
    User.find().exec()
  ]);

  res.render("dashboard", { messages: messages, authors: authors });
}));

router.post("/sign-up", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedpassword,
        member: false,
      });
      await user.save();
      res.redirect("/users/sign-in");
    })
  } catch(err) {
    return next(err);
  }
});

module.exports = router;
