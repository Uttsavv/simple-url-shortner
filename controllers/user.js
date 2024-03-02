const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    return res.status(201).redirect("/url");
};

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const currUser = await User.findOne({ email, password });

    if (!currUser) {
        return res.render("login", {
            err: "Invalid Credentials",
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, currUser);
    res.cookie("uuid", sessionId);
    return res.redirect("/url");
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
