// const { NODE_ENV } = require("../lib/env");
const { NODE_ENV } = process.env;
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {corsConfig} = require("./rules/cors-option");
// ConfigApp
const ConfigApp = (app) => {
  app.use(corsConfig());
  // app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  if (NODE_ENV === "development") app.use(morgan("dev"));
};

module.exports = { ConfigApp };
