const express = require("express");
const path = require("path");

const app = express();
const PORT = 8001;

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter.js");
const connMongoDB = require("./connections.js");

//conn
connMongoDB("mongodb://127.0.0.1:27017/shortURLs").then(() =>
    console.log("Connected to monogodb")
);

//EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing
app.use("/url", urlRouter);
app.use("/", staticRouter);

//server start
app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
