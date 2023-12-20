const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (
            ["/users/login", "/users/register", "/users/password"].includes(
                req.originalUrl
            )
        ) {
            return next();
        }
    }
    next();
};

const redirectToAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Exclude /users/admin to prevent the infinite loop
        if (req.originalUrl !== "/users/admin") {
            return res.redirect("/users/admin");
        }
    } else if (["/401", "/404", "/500"].includes(req.originalUrl)) {
        return next();
    }
    next();
};

module.exports = {
    isAuthenticated,
    redirectToAdmin,
};
