import mongoose from "mongoose";
const { NODE_ENV, DB_PASSWORD, MONGO_URI, MONGO_DB } = process.env;

export const connectDB = async () => {
  const uri = String(MONGO_URI).replace("<PASSWORD>", String(DB_PASSWORD));
  const isDev = NODE_ENV === "development" ? String(MONGO_DB) : uri;

  console.log("🛠 Environment:", NODE_ENV);
  console.log("🛠 Using DB connection string:", isDev.replace(DB_PASSWORD || "", "****"));
  try {
    await mongoose.connect(isDev);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
