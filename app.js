const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require("./routes/users.js");

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collection: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

require("./config/passport.js");

// These two middlewears work together - firstly they check if the user is null. If it is NOT null, they will,
// get the user and from the req.user and do stuff with it.
// Of course, if it is NULL, then the user is not logged in.
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // res.locals.currentUser = req.user;
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use('/', indexRouter);
app.use("/users", usersRouter);

app.post("/users/sign-in", passport.authenticate("local", {
  successRedirect: "/users/dashboard",
  failureRedirect: "/users/sign-in"
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;