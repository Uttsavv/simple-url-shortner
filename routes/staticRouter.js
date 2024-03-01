const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    return res.render("home", {
        allUrls,
    });
});

module.exports = router;
