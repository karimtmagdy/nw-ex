import { fn } from "../lib/utils";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import AppError from "../class/api-error";
import { IUser } from "../types/UserType";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    email,
    password,
    gender,
    role,
  }: Pick<IUser, "username" | "email" | "password" | "gender" | "role"> =
    req.body;
  const exitsUser = await User.findOne({ email }).select("-password").exec();
  if (exitsUser) return next(new AppError("user already exist", 400));
  const payload = { username, email, password, gender, role };
  const user = await User.create(payload);
  delete user.password;
  await user.save();
  res
    .status(201)
    .json({ status: "success", message: "user has been created", user });
};
export const getAllUser = fn(async (req: Request, res: Response) => {
  const page: any = req.query.page || 1;
  const limit: any = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const total = await User.countDocuments();
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("email username role photo status")
    .lean();

  res.status(200).json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    users,
  });
});
export const singleUser = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id }).exec();
    if (!user) return next(new AppError("user not found", 404));
    res.status(200).json({ status: "success", user });
  }
);
export const updateUser = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { role }: Pick<IUser, "role"> = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { role } },
      { new: true }
    );
    if (!user) return next(new AppError("user not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "user has been updated", user });
  }
);
export const deleteUser = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return next(new AppError("user not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "user has been deleted" });
  }
);
