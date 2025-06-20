const { User } = require("../models/User");
const { fn } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const jwt = require("jsonwebtoken");

// @access  Public
exports.register = fn(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ username, email });
  if (existingUser) return next(new AppError("User already exists", 400));
  const user = await User.create({
    username,
    email,
    password,
  });
  await user.save();
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// @access  Public
exports.login = fn(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentials", 400));
  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("Invalid email or password", 400));
  // Create JWT token
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_ACCESS,
  });
  // Create refresh token
  //   const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
  //     expiresIn: "24h",
  //   });
  // user.refreshToken = refreshToken;
  jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_EXPIRY_REFRESH },
    (err, refreshToken) => {
      if (err) throw err;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      user.refreshToken = refreshToken;
    }
  );
  user.active = true;
  user.isOnline = "online";
  user.last_login = new Date();
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
    user: userObject,
  });
});

// @access  Public
exports.logout = fn(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const cookie = req.cookies.refreshToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email }).exec();
  user.active = false;
  user.isOnline = "offline";
  await user.save();
  if (!cookie || !decoded) next(new AppError("Already logged out", 400));
  res.clearCookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
