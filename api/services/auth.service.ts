import { NextFunction, Request, Response } from "express";
import { fn } from "../lib/utils";
import { User } from "../models/User";
import { IUser } from "../types/UserType";
import AppError from "../class/api-error";
import { createToken, refreshToken } from "../lib/helper";
import { JWT_SECRET } from "../lib/env-local";
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
    user.refreshToken = refreshToken(user);
    user.active = "online";
    user.isActive = true;
    user.activeAt = new Date();
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.createdAt;
    delete userObj.updatedAt;
    await user.save();
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      signed: false,
    });
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
    const token = req.get("Authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findOne({ email: decoded.email }).exec();
    // if (!decoded) next(new AppError("Already signed out", 400));
    user.active = "offline";
    user.isActive = false;
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
export const forgotPassword = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as Pick<IUser, "email">;
    const user = await User.findOne({ email }).exec();
    if (!user) return next(new AppError(`Invalid credentials ${email}`, 404));
  }
);
export const refresh = fn(async (req, res, next) => {});
