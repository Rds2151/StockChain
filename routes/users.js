var express = require("express");
var router = express.Router();
const {register, addIngredientData, fetchStock} = require("../models/user");
const flash = require("connect-flash");
const passport = require("passport");
router.use(flash())

// router.use((req, res, next) => {
//     const user = req.session.user;

//     if (!user) {
//         if (req.originalUrl === '/users/login' || req.originalUrl === '/users/register' || req.originalUrl === '/users/password') {
//             return next();
//         } else {
//             return res.redirect('/users/login');
//         }
//     }

//     next();
// });


router.get("/admin",async (req, res, next) => {
	const user = req.session.user;
	if (!user || Object.keys(user).length === 0) {
		return res.redirect("/");
    }
	
	try {
		const items = await fetchStock(user.Email);
		let data = req.flash()
		if (data.message) {
			res.render("index", {"user":user, "items":items, "messages" : data.message});
		}
		res.render("index", {"user":user, "items":items});

	} catch(error) {
		res.render("index", {"user":user, "messages" : [error,true]});
	}
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
    failureRedirect: '/users/login',
    failureFlash: true
  }),(req,res,next) => {
	req.session.user = req.user;
	res.redirect("/users/admin");
  }
);
  
router.post("/register", async (req, res, next) => {
    const { email, fname, lname, restaurantName,location, password } = req.body;
    const name = fname + " " + lname;

    const result = await register(restaurantName, email, name,location, password);
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
	req.session = null;
    res.redirect("/users/login");
});


router.post("/requestData", (req, res, next) => {
    const { itemName, quantity } = req.body;
    // const data = requestData(req.session.user.email, itemName, quantity);
    res.status(200).send(quantity)
});

router.post("/addIngredient", async (req, res, next) => {
    const { ingredientName, quantity } = req.body; 
	let message;
	let user = req.session.user;
	try {
		let result = await addIngredientData(user.Email, ingredientName, quantity);
		message = result.message;
	} catch (error) {
		message = [error.message,true];
	}
	req.flash("message",message)
    res.redirect("admin")
});

router.use((req, res, next) => {
	res.redirect("/404");
});
module.exports = router;