var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/users/dashboard");
  } else {
    res.redirect("/users/sign-in");
  }
});

module.exports = router;