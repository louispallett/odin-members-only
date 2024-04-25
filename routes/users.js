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
  if (req.isAuthenticated()) {
    const [messages, authors] = await Promise.all([
      Message.find().sort({ date:-1 }).exec(),
      User.find().exec()
    ]);
  
    res.render("dashboard", { messages: messages, authors: authors, user: req.user });
  } else {
    res.redirect("/");
  }
}));

router.post("/sign-up", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedpassword,
      });
      await user.save();
      res.redirect("/users/sign-in");
    })
  } catch(err) {
    return next(err);
  }
});

router.post("/new-message", asyncHandler(async (req, res, next) => {
  //TODO: sanatize form here

  const message = new Message({
    author: req.user._id,
    subject: req.body.subject,
    content: req.body.content,
    date: new Date()    
  });

  //TODO: Check for errors in sanitation

  await message.save();
  res.redirect("/users/dashboard")
}));

router.get("/logout", (req, res, next) => {
  // Note that req.logout() (passportJS) now requires a callback - something like this:
  req.logout((err) => {
    if (err) { 
      return next(err)
    }
    res.redirect("/users/sign-in");
  });
});

module.exports = router;
