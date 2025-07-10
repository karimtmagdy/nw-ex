const { User } = require("../models/User");
const { fn } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const { VALID } = require("../lib/status/msg-status");

exports.createUser = fn(async (req, res, next) => {
  const { username, email, password, role, gender } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) return next(new AppError(VALID.user_exist, 400));
  const payload = { username, email, password, role, gender };
  const user = await User.create(payload);
  await user.save();
  res.status(201).json({
    status: "success",
    message: VALID.user_created,
    user: payload,
  });
});

exports.getSingleUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).exec();
  if (!user) return next(new AppError(VALID.user_not, 404));
  res.status(200).json({ status: "success", user });
});
exports.deleteUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) return next(new AppError(VALID.user_not, 404));
  res.status(200).json({ status: "success", message: VALID.user_removed });
});
exports.updateUser = fn(async (req, res, next) => {
  const { id } = req.params;
  const { password, role } = req.body;
  const updates = {};
  if (password) updates.password = password;
  if (role) updates.role = role;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: updates },
    { new: true }
  );
  if (!user) return next(new AppError(VALID.user_not, 404));
  res
    .status(200)
    .json({ status: "success", message: VALID.user_updated, user });
});
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
