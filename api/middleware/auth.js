const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");
const { User } = require("../models/User");
const { fn } = require("../lib/utils");
const { VALID } = require("../lib/status/msg-status");

module.exports.authorize = fn(async (req, res, next) => {
  const token = req.get("Authorization");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("Invalid token", 401));
  const user = await User.findById(decoded._id).select("-password");
  if (!user) return next(new AppError(VALID.user_not, 404));
  req.user = decoded;
  next();
});

module.exports.isStaff = fn(async (req, res, next) => {
  const allowedRoles = ["admin", "manager", "moderator"];
  if (req.user && allowedRoles.includes(req.user.role)) {
    return next();
  }
  return next(new AppError(VALID.forbidden, 403));
});
module.exports.onlyAdmin = fn(async (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return next(new AppError(VALID.admin, 403));
});
