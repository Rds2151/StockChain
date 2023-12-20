var express = require("express");
var router = express.Router();
const {register} = require("../models/user");
const flash = require("connect-flash");
const passport = require("passport");
router.use(flash())

router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		if (req.originalUrl === '/users/admin' || req.originalUrl === '/users/logout') {
            return next();
        }
		return res.redirect("/users/admin");
	}
	else if (req.originalUrl === '/users/login') return next(); 
	else if (req.originalUrl === '/users/register') return next();
	else if (req.originalUrl === '/users/password') return next();

	res.redirect("/");
}); 

router.get("/admin", (req, res, next) => {
    res.render("index");
});

router.get("/login", (req, res, next) => {
	let data = req.flash()
	if (data.error) result = [data.error,true]
	else result = data.messages 

    res.render("login", {"messages" : result});
});

router.get("/register", (req, res, next) => {
    res.render("register");
});

router.post('/login', 
  passport.authenticate('local', {
	successRedirect: "/users/admin",
    failureRedirect: '/users/login',
    failureFlash: true
  })
);
  
router.post("/register", async (req, res, next) => {
    const { email, fname, lname, restaurantName, password } = req.body;
    const name = fname + " " + lname;

    const result = await register(restaurantName, email, name, password);
    if (result.hasError) {
        res.render("register", {"message":result.error});
    } else {
		req.flash("messages", [result.message, false]);
		res.redirect("/users/login");
	}
});


router.get("/password", (req, res, next) => {
    res.render("password");
});

router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/users/login");
});

router.use((req, res, next) => {
	res.redirect("/404");
});

module.exports = router;