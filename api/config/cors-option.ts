import cors from "cors";
import AppError from "../class/api-error";

export const corsOption = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://bandw.vercel.app",
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new AppError("Not allowed by CORS", 403));
      }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      // "Accept-Version",
      // "Accept",
      // "Access-Control-Allow-Methods",
      // "Access-Control-Allow-Headers",
      // "Access-Control-Allow-Credentials",
    ],
    credentials: true,
    preflightContinue: false,
    // maxAge: 86400, // 24 hours
    optionsSuccessStatus: 204,
    // exposedHeaders: ["Set-Cookie"],
  });
};
