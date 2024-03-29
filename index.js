const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8001;

const connMongoDB = require("./connections.js");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter.js");
const userRouter = require("./routes/user.js");
const {
    checkAuthentication,
    restrictToRole,
} = require("./middlewares/auth.js");

//conn
connMongoDB("mongodb://127.0.0.1:27017/shortURLs").then(() =>
    console.log("Connected to MongoDB")
);

//EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

//Routing
app.use("/url", restrictToRole(["NORMAL", "ADMIN"]), urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

//server start
app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
