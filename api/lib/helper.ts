import jwt from "jsonwebtoken";
import { IUser } from "../types/UserType";
import { Response } from "express";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "./env-local";
export const createToken = (user: IUser) => {
  const payload = { id: user._id, role: user.role, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};
export const refreshToken = (user: IUser) => {
  const payload = { id: user._id, role: user.role, email: user.email };
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
export const isTokenValid = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string);
};

export const attachCookiesToResponse = (res: Response, user: IUser) => {
  const token = createToken(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.cookie("user", JSON.stringify(user), {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
