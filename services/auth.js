const jwt = require("jsonwebtoken");
const secretKey = "#123123UtsavSingh@yoyo";

const setUser = (user) => {
    const payload = { _id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, secretKey);
};

const getUser = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    setUser,
    getUser,
};
