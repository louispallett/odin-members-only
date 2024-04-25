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
    const messages = await Message.find().populate("author").sort({ date:-1 }).exec();
  
    res.render("dashboard", { messages: messages, user: req.user });
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

router.post("/dashboard/members", asyncHandler(async (req, res, next) => {
  // We aren't passing the password into any database, so sanitation may not be strictly necessary
  if (req.body.password == process.env.MEMBER_PASS) {
    const user = new User({
      username: req.user.username,
      password: req.user.password,
      member: true,
      admin: req.user.admin,
      _id: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, user);
    console.log("User is now a member!")
  } else {
    console.log("Incorrect password")
  }
  res.redirect("/users/dashboard")
}));

router.post("/dashboard/new-message", asyncHandler(async (req, res, next) => {
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
