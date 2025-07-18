require("dotenv/config");
const express = require("express");
const { ConfigApp } = require("./config/config-app");
const { connectDB } = require("./config/db");
const { RouterApplication } = require("./routes");

connectDB();
const app = express();
ConfigApp(app);
RouterApplication(app);

app.get("/", (req, res) => {
  res.send("Hello from API Express on Vercel");
});

module.exports = app;
// console.log(typeof module.exports)