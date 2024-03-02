const User = require("../models/user");

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    return res.status(201).redirect("/");
};

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const currUser = await User.findOne({ email, password });

    if (!currUser)
        return res.render("login", {
            err: "Invalid Credentials",
        });

    return res.redirect("/");
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
