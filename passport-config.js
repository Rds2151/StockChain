const LocalStrategy = require("passport-local").Strategy;
const server = require("./models/server");
const bcrypt = require("bcrypt");
const passport = require("passport");
const sobj = new server();

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {          
            try {
                const user = await sobj.getEmail(email);
                if (user == null) {
                    return done(null, false,"No user found with that email");
                }

                if (bcrypt.compareSync(password, user.Password)) {
                    return done(null, user);
                } else {
                    return done(null, false,"Incorrect password");
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id); // Assuming user has an 'id' property
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await sobj.getUserById(id); // Implement this method in your server class
        done(null, user);
    } catch (error) {
        done(error);
    }
});
