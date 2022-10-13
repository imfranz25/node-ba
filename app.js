require("dotenv").config();
require("./config/database").connect();

// setup express
const express = require("express");
const app = express();

// import routes
const account = require("./routes/account");

app.use(express.json());
app.use("/account", account);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;