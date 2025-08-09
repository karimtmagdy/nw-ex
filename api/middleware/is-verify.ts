import { NextFunction, Request, Response } from "express";

export const authorize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const onlyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
