const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");
const { User } = require("../models/User");
const { fn, auth } = require("../lib/utils");

module.exports.authorize = fn(async (req, res, next) => {
  const token = auth(req);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("Invalid token", 401));
  const user = await User.findById(decoded._id).select("-password").exec();
  if (!user) return next(new AppError("User not found", 404));
  req.user = decoded;
  next();
});

module.exports.isStaff = fn(async (req, res, next) => {
  const allowedRoles = ["admin", "manager", "moderator"];
  if (req.user && allowedRoles.includes(req.user.role)) {
    next();
  } else {
    return next(new AppError("Access denied. Admin privileges required", 403));
  }
});
module.exports.onlyAdmin = fn(async (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return next(new AppError("Access denied", 403));
});
