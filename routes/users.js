var express = require('express');
var router = express.Router();

router.get("/admin",(req,res,next) => {
  res.render('dashboard');
})

router.get("/login",(req, res, next) => {
  res.render('login')
})

router.get("/register",(req, res, next) => {
  res.render('register')
})

router.post("/register",(req, res, next) => {
  let passTo = "login";
  passTo = "register";
  res.render()
})

router.get("/password",(req, res, next) => {
  res.render('password')
})

router.get("/logout", (req,res,next) => {
  res.render("login")
})


module.exports = router;
