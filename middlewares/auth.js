const { getUser } = require("../services/auth");

const restrictToLoggedInUser = (req, res, next) => {
    // const token = req.cookies?.token;

    const uid = req.headers["authorization"];
    const token = uid.split("Bearer ")[1];

    if (!token) return res.redirect("/user/login");

    const currUser = getUser(token);
    if (!currUser) return res.redirect("/user/login");

    req.user = currUser;
    next();
};

module.exports = {
    restrictToLoggedInUser,
};
