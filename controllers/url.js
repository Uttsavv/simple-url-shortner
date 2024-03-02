const shortid = require("shortid");
const Url = require("../models/url");

const handleGenerateShortURL = async (req, res) => {
    const body = req.body;
    const currUser = req.user;

    if (!body.url) {
        return res.status(400).json({ Err: "URL is required" });
    }

    const shortId = shortid.generate();

    await Url.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: currUser._id,
    });

    const allUrls = await Url.find({ createdBy: currUser._id });
    return res.render("home", {
        shortId,
        allUrls,
    });
    //return res.status(201).json({ shortId });
};

const handleRedirect = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirectURL);
};

const handleShowAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });

    return res.json({
        Clicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    });
};

module.exports = {
    handleGenerateShortURL,
    handleRedirect,
    handleShowAnalytics,
};
