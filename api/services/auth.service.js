const { User } = require("../models/User");
const { fn } = require("../lib/utils");
const { AppError } = require("../class/app.error");
const jwt = require("jsonwebtoken");
const { VALID } = require("../lib/status/msg-status");
const {
  JWT_EXPIRY_ACCESS,
  JWT_SECRET,
  NODE_ENV,
  JWT_REFRESH_SECRET,
  JWT_EXPIRY_REFRESH,
} = require("../lib/env");

exports.register = fn(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ username, email });
  if (existingUser) return next(new AppError(VALID.user_invalid, 400));
  const user = await User.create({ username, email, password });
  await user.save();
  const payload = { _id: user._id, username: user.username, email: user.email };
  res.status(201).json({
    status: "success",
    message: VALID.registered,
    user: payload,
  });
});
exports.login = fn(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError(VALID.user_invalid, 400));
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError(VALID.user_invalid, 400));
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    username: user.username,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY_ACCESS,
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_EXPIRY_REFRESH,
  });
  user.refreshToken = refreshToken;
  user.active = true;
  user.isActive = "online";
  user.activeAt = new Date();
  await user.save();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: NODE_ENV === "production",
  });
  res.status(200).json({ status: "success", message: VALID.loggedIn, token,user });
});
exports.logout = fn(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const cookie = req.cookies.refreshToken;
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ email: decoded.email }).exec();
  user.active = false;
  user.isActive = "offline";
  if (!cookie || !decoded) next(new AppError("Already logged out", 400));
  await user.save();
  res.clearCookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ status: "success", message: VALID.loggedOut });
});
exports.refresh = fn(async (req, res, next) => {});
exports.forgotPassword = fn(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.create({ username, email, password });
});
