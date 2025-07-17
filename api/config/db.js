const mongoose = require("mongoose");
const { MONGO_DB, NODE_ENV, DB_PASSWORD, MONGO_URI } = process.env;
exports.connectDB = () => {
  const isDev = NODE_ENV === "development";
  const uri = isDev
    ? MONGO_DB
    : MONGO_URI.replace("<PASSWORD>", String(DB_PASSWORD));
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
  // Optional debug mode
  // mongoose.set("debug", isDev);
};
