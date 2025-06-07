const { User } = require("../models/User");
const { fn, paginate } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");

// @access  Private
exports.createUser = fn(async (req, res, next) => {
  const { username, email, password, role, gender } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) return next(new AppError("User already exists", 400));
  const user = await User.create({
    username,
    email,
    password,
    role,
    gender,
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

// @access  Private
exports.getAllUsers = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Category.countDocuments();
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("-password -refreshToken -cart -orders -tags -remember_me -slug")
    .lean();
  res.json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    users,
  });
});

// @access  Private
exports.getSingleUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).exec();
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({ status: "success", user });
});

// @access  Private
exports.updateUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const { username, role } = req.body;
  const updates = {};
  if (username) updates.username = username;
  if (role) updates.role = role;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: updates },
    { new: true }
  );
  if (!user) return next(new AppError("User not found", 404));
  res
    .status(200)
    .json({ status: "success", message: "User updated successfully", user });
});

// @access  Private
exports.deleteUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) return next(new AppError("User not found", 404));
  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});
