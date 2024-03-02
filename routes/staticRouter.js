const express = require("express");
const Url = require("../models/url");
const { restrictToRole } = require("../middlewares/auth");
const router = express.Router();

router.get("/allUrls", restrictToRole(["ADMIN"]), async (req, res) => {
    const allUrls = await Url.find({});

    return res.render("home", {
        allUrls,
    });
});

router.get("/url", async (req, res) => {
    const currUser = req.user;
    const allUrls = await Url.find({ createdBy: currUser._id });
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
