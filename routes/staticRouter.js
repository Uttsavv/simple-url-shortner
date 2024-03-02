const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    return res.render("home", {
        allUrls,
    });
});

router.get("/user/signup", (req, res) => {
    return res.render("signup");
});

router.get("/user/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
