import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/env-local";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get("Authorization");
  if (!auth)
    res.status(403).json({ message: "authorization header was not provided" });
  const token = auth.split(" ")[1];
  if (!token) res.status(401).json({ message: "token not found" });
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "invalid or expire token" });
  }
  // const user = await User.findOne({ email: decode.email });
  //  const user = await User.findById(decode).select("-password");
  // req.user = user;
  // console.log("req.user", req.user);
  // jwt.verify(token, NODE_ENV, async (err, decoded) => {
  //   // if (err) return res.json({ mes: "noo token"});
  //   const user = (await User.findOne({
  //     email: decoded.email,
  //   })) as UserPayload as JwtPayload;
  //   req.user = user;
  //   next();
  // });
};
export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const allowedRoles = ["admin", "manager", "moderator"] as const;
  if (req.user && allowedRoles.includes(req.user["role"])) {
    return next();
  }
  res.status(403).json({ message: "your not any one" });
};
// module.exports.isStaff = fn(async (req, res, next) => {
//   if (req.user && allowedRoles.includes(req.user.role)) {
//     return next();
//   }
//   return next(new AppError(VALID.forbidden, 403));
// });
// module.exports.onlyAdmin = fn(async (req, res, next) => {
//   if (req.user?.role === "admin") return next();
//   return next(new AppError(VALID.admin, 403));
// });
