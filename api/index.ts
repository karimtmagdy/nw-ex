import "dotenv/config";
const { PORT, NODE_ENV } = process.env;
import app from "./server";
import { MiddlewareApplication } from "./middleware/middleware";

MiddlewareApplication(app);
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT} 🧪 in ${NODE_ENV}`
  );
});
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection:", err);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received, shutting down gracefully");
  process.exit(0);
});
