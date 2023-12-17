var express = require("express");
var router = express.Router();
const {register} = require("../models/user");
const flash = require("connect-flash");
const passport = require("passport");

router.use(flash())
router.use((req,res,next) => {
	if (req.isAuthenticated) {
		return next()
	}
	res.redirect("/login")
})

router.get("/admin", (req, res, next) => {
    res.render("index");
});

router.get("/login", (req, res, next) => {
    res.render("login");
});

router.get("/register", (req, res, next) => {
    res.render("register");
});

router.post("/login", passport.authenticate('local', {
	successRedirect: "/admin",
	failureRedirect: "/users/login",
	failureFlash: true 
}))

router.post("/register",async (req, res, next) => {
	const { email, fname, lname, restaurantName, password } = req.body;
	const name = fname+" "+lname;

	const result = await register(restaurantName,email,name,password);
	if(result.hasError) {
		res.render("register");
	} else {
		res.redirect("login")
	}
});

router.get("/password", (req, res, next) => {
    res.render("password");
});

router.get("/logout", (req, res, next) => {
    res.render("login");
});

router.use((req, res, next) => {
	res.redirect("/404");
});

module.exports = router;
