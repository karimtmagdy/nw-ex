import jwt from "jsonwebtoken";
import { IUser } from "../types/UserType";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "./env-local";

export const createToken = (user: IUser) => {
  const { _id, role, username, email } = user;
  const payload = { _id, role, email, username };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};
export const refreshToken = (user: IUser) => {
  const payload = { id: user._id, role: user.role, email: user.email };
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
export const isTokenValid = (token: string) => {
  return jwt.verify(token, JWT_SECRET); // as JwtPayload;
};
//   const oneDay = 1000 * 60 * 60 * 24;
//   secure: NODE_ENV === "production",
