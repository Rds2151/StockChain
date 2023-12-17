const LocalStrategy = require("passport-local").Strategy;
const server = require("./models/server")
const bcrypt = require("bcrypt")
const sobj = new server()

function initialize(passport) {
    passport.use(
        new LocalStrategy({
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await sobj.getEmail(email)
                if ( user == null) {
                    return done(null, false, { message : `No user Found with that email`, hasError : true})
                } 

                if (bcrypt.compareSync(password,user.Password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message : "Incorrect password", hasError : true})
                }
            } catch (error) {
                return done(error)
            }
        }
    ));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
