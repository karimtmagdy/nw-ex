const mongoose = require("mongoose");

exports.connectDB = () => {
  // Connect to MongoDB
  const MONGODB_URI = process.env.MONGO_URI;
  const db = process.env.DB_PASSWORD;
  const local=process.env.LOCAL
  mongoose
    .connect(String(local))
    // .connect(MONGODB_URI.replace("<PASSWORD>", String(db)))
    .then(() => console.log("MongoDB connected successfully"))
    // .catch((err) => console.error("MongoDB connection error:", err));
};
