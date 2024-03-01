const mongoose = require("mongoose");

const connMongoDB = async (URI) => await mongoose.connect(URI);

module.exports = connMongoDB;
