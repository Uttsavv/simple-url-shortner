const express = require("express");
const {
    handleGenerateShortURL,
    handleRedirect,
    handleShowAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/:shortId", handleRedirect);

router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortId", handleShowAnalytics);

module.exports = router;
