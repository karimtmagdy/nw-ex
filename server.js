require("dotenv/config");
const express = require("express");
// const app = require("express")();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./api/config/db");
const { handler } = require("./api/routes");
const { MiddlewareApplication } = require("./api/middleware/middleware");

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
connectDB();
handler(app);
app.get("/", (req, res) => {
  res.send("Hello from API Express on Vercel");
});
MiddlewareApplication(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
