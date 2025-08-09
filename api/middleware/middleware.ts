import { Express, NextFunction, Request, Response } from "express";
import AppError from "../class/api-error";
import { errorHandler } from "./error-handler";
export const MiddlewareApplication = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log(`[ ${ip} ] ${req.method} ${req.url}`);
    const error = new AppError(
      `cant find this route ${req.originalUrl} on this server`,
      500
    );
    next(error);
  });
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico"
  //     ? res.status(204).end()
  //     : next();
  // });
  // Global error handling middleware (add this after all routes)
  app.use(errorHandler);
};
