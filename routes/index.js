var express = require('express');
var router = express.Router();
const passport = require("passport")

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect("/users/admin")
  }
  res.render('login');
});

router.get("/401", (req,res,next) => {
  res.render("401")
})

router.get("/404", (req,res,next) => {
  res.render("404")
})

router.get("/500", (req,res,next) => {
  res.render("500")
})


module.exports = router;
