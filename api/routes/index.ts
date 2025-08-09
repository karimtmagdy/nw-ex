import { Express } from "express";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.routes";
import { chatRouter } from "./chat.routes";
export const RouterApplication = (app: Express) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/chats", chatRouter);
};
