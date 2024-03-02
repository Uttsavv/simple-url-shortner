const { getUser } = require("../services/auth");

const checkAuthentication = (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) return next();

    const currUser = getUser(token);
    req.user = currUser;

    return next();
};

const restrictToRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.redirect("/user/login");

        if (!roles.includes(req.user.role)) return res.end("Not Authorized");

        return next();
    };
};

module.exports = {
    checkAuthentication,
    restrictToRole,
};
