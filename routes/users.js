const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Message = require("../models/message");
const User = require("../models/user");

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up", { title: "Sign Up" });
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

router.post("/sign-up", 
  body("username", "Username must be between 3 and 15 characters")
    .trim()
    .isLength({ min:3, max:15 })
    .escape(),
  body("password")
    .trim()
    .escape(),
  body("confPassword")
    .trim()
    .escape(),

  asyncHandler (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up", { 
        title: "Sign Up",
        errors: errors.array(),
      });
      return;
    }

    const username_exists = await User.findOne({ username: req.body.username });
    if (username_exists) {
      res.render("sign-up", { 
        title: "Sign Up",
        errors: [{ msg: "Username taken!" }],
      });
      return;
    }

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
  })
);

router.post("/dashboard/members", 
  body("memberPass", "Please complete this field")
    .trim()
    .isLength({ min:1 })
    .escape(),

asyncHandler(async (req, res, next) => {
  if (req.body.memberPass == process.env.MEMBER_PASS) {
    const user = new User({
      username: req.user.username,
      password: req.user.password,
      member: true,
      admin: false,
      _id: req.user._id
    });
    await User.findByIdAndUpdate(req.user._id, user);
  }
  res.redirect("/users/dashboard")
}));

router.post("/dashboard/admin",
  body("adminPass", "Please complete this field")
    .trim()
    .isLength({ min:1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    if (req.body.adminPass == process.env.ADMIN_PASS) {
      const user = new User({
        username: req.user.username,
        password: req.user.password,
        member: req.user.member,
        admin: true,
        _id: req.user._id
      });

      await User.findByIdAndUpdate(req.user._id, user);
    }
    res.redirect("/users/dashboard")
  })
);


router.post("/dashboard/delete-msg", asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.delMsgId);
  res.redirect("/");
}));

router.post("/dashboard/new-message", 
  body("subject", "")
    .trim()
    .isLength({ min:1, max:30 })
    .escape(),
  body("content", "")
    .trim()
    .isLength({ min:1, max:300 })
    .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect("/");
      return;
    }

    const message = new Message({
      author: req.user._id,
      subject: req.body.subject,
      content: req.body.content,
      date: new Date()    
    });

    await message.save();
    res.redirect("/users/dashboard")
  })
);

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
