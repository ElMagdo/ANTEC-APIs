const express = require("express");
const app = express();
const router = require("./src/routes/route");
require('dotenv').config();
const mongoose = require("mongoose");

//configure mongoose
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }
    });


app.use(express.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ANTEC application." });
});

app.use("/attendance", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;