import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
export const fn = (callback: RequestHandler) => asyncHandler(callback as any);
