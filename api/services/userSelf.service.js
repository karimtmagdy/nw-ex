const { User } = require("../models/User");
const { fn, paginate } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const jwt = require("jsonwebtoken");

// @access  Private
exports.updateUserPassword = fn(async (req, res, next) => {});

// @access  Private
exports.getMe = fn(async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id).select("-password").exec();
  if (!user) return next(new AppError("User not found", 404));
  res.json({ status: "success", user });
});

// @access  Private
exports.deleteMe = fn(async (req, res, next) => {});

// @access  Private
exports.updateMe = fn(async (req, res, next) => {
  const { id } = req.params;
  const { username, password, age, gender, photo } = req.body;
  const updatesFields = {};
  if (username) updatesFields.username = username;
  if (password) updatesFields.password = password;
  if (age) updatesFields.age = age;
  if (gender) updatesFields.gender = gender;
  if (photo) updatesFields.photo = photo;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: updatesFields },
    { new: true }
  );
  if (!user) return next(new AppError("User not found", 404));
  res
    .status(200)
    .json({ status: "success", message: "User updated successfully", user });
});
