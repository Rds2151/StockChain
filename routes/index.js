var express = require('express');
var router = express.Router();
const passport = require("passport")

// passport.use(new LocalStrategy(
//   function(username,password,done) {
//   }
// ))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/index", (req,res,next) => {
  res.render("index")
})


module.exports = router;
