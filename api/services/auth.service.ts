import { NextFunction, Request, Response } from "express";
import { fn } from "../lib/utils";
import { User } from "../models/User";
import { IUser } from "../types/UserType";
import AppError from "../class/api-error";
import { createToken, refreshToken } from "../lib/helper";
import { NODE_ENV, JWT_SECRET } from "../lib/env-local";
import jwt, { JwtPayload } from "jsonwebtoken";

export const register = fn(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password } = req.body as Pick<
      IUser,
      "username" | "email" | "password"
    >;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();
    if (existingUser) return next(new AppError("User already exists", 400));
    const user = await User.create({ username, email, password });
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    await user.save();
    res.status(201).json({
      status: "success",
      message: "user registered successfully",
      user: payload,
    });
  }
);
export const login = fn(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body as Pick<IUser, "email" | "password">;
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) return next(new AppError("Invalid credentials", 400));
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new AppError("Invalid credentials", 400));
    const token = createToken(user);
    // user.refreshToken = refreshToken(user);
    user.active = "online";
    user.isActive = true;
    user.activeAt = new Date();
    const userObj = user.toObject();
    delete userObj.password;
    await user.save();
    // res.cookie("refreshToken", refreshToken, {
    //   // path: "/api/v1/auth/refresh-token",
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   sameSite: "strict",
    //   secure: NODE_ENV === "production", //true
    // });
    res.status(200).json({
      status: "success",
      message: "user signed in successfully",
      user: userObj,
      token,
    });
  }
);
export const logout = fn(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const cookie = req.cookies.refreshToken;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findOne({ email: decoded.email }).exec();
    user.active = "offline";
    user.isActive = false;
    if (!cookie || !decoded) next(new AppError("Already signed out", 400));
    await user.save();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    res
      .status(200)
      .json({ status: "success", message: "user signed out successfully" });
  }
);
export const refresh = fn(async (req, res, next) => {});
