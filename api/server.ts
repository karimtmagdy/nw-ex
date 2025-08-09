import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { ConfigApp } from "./config/config-app";
import { RouterApplication } from "./routes";


connectDB()
const app = express();
ConfigApp(app);
RouterApplication(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from API Express TypeScript! on Vercel");
});

export default app;
// parse-json catch error
// console.log(error.message); // Unexpected token a in JSON at position 21
// console.log(error.line);    // 1
// console.log(error.column);  // 22