const { NODE_ENV } = process.env;
import { Request, Response, NextFunction } from "express";
import {
  handleCastError,
  handleDuplicatedFieldDB,
  handleJWTError,
  handleJWTExpiredError,
  handleValidationError,
} from "./globals-errors";
export const errorHandler = (
  err: any, // Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  // Handle specific error types
  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  // if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.code === 11000) error = handleDuplicatedFieldDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    error: err,
    message: error.message,
    stack: NODE_ENV === "development" ? error.stack : undefined,
  });
};
