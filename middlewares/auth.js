const { getUser } = require("../services/auth");

const restrictToLoggedInUser = (req, res, next) => {
    const sessionId = req.cookies?.uuid;

    if (!sessionId) return res.redirect("/user/login");

    const currUser = getUser(sessionId);
    if (!currUser) return res.redirect("/user/login");

    req.user = currUser;
    next();
};

module.exports = {
    restrictToLoggedInUser,
};
