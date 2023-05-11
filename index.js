const express = require("express");
const app = express();
const router = require("./src/routes/route");
require('dotenv').config();
const passport = require("passport");
const mongoose = require("mongoose");
/*var { expressjwt: jwt } = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});*/
//configure mongoose
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        //process.exit();
    });

require("./src/passport");

app.use(express.json());
app.use(passport.initialize());

// error handlers --Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "message": err.name + ": " + err.message });
    }
});

let ALLOWED_ORIGINS = ["http://serverabc.com", "http://localhost:4200"];
app.use('/attendance', (req, res, next) => {
    let origin = req.headers.origin;
    let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
    res.header("Access-Control-Allow-Origin", theOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use("/attendance", router);
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ANTEC application." });
});

app.get("/attendance", (req, res) => {
    res.json({ message: "Attendance API hosted on Vercel." });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;