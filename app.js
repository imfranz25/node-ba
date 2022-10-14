require("dotenv").config();
require("./config/database").connect();

// setup express
const express = require("express");
const path = require("path");
const app = express();

// import routes
const account = require("./routes/account");

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( express.static(path.join(__dirname, "public")) );
app.use("/account", account);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;