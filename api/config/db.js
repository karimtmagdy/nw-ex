const mongoose = require("mongoose");
const { MONGO_DB } = require("../lib/local.env");

exports.connectDB = () => {
  // Connect to MongoDB
  // const MONGODB_URI = process.env.MONGO_URI;
  // const db = process.env.DB_PASSWORD;

  mongoose
    .connect(String(MONGO_DB))
    // .connect(MONGODB_URI.replace("<PASSWORD>", String(db)))
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};
