const { SubCategory } = require("../models/SubCategory");
const { fn } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");

// @access  Private
exports.createSubCategory = fn(async (req, res, next) => {
  const { name, category } = req.body;
  // Check if subcategory already exists
  let subcategory = await SubCategory.findOne({ name });
  if (subcategory) return next(new AppError("subcategory already exists", 400));
  subcategory = await SubCategory.create({ name, category });
  await subcategory.save();
  res.status(201).json({
    status: "success",
    message: "subcategory created successfully",
    subcategory,
  });
});

// @access  Public
exports.getAllSubCategories = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await SubCategory.countDocuments();
  const subcategories = await SubCategory.find().skip(skip).limit(limit);
  if (!subcategories) return next(new AppError("No subcategories found", 404));
  res.status(200).json({
    results: total,
    page,
    pages: Math.ceil(total / limit),
    subcategories,
  });
});

// @access  Private
exports.updateSubCategory = fn(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    { name, category },
    { new: true, runValidators: true }
  );
  if (!subcategory) return next(new AppError("subcategory not found", 404));
  await subcategory.save();
  res.status(200).json({
    status: "success",
    message: "sub category updated successfully",
    subcategory,
  });
});

// @access  Public
exports.getSubCategoryById = fn(async (req, res, next) => {
  const subcategory = await SubCategory.findById(req.params.id);
  if (!subcategory) return next(new AppError("subcategory not found", 404));
  res.status(200).json({
    status: "success",
    message: "subcategory updated successfully",
    subcategory,
  });
});

// @access  Private
exports.deleteSubCategory = fn(async (req, res, next) => {
  const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subcategory) return next(new AppError("subcategory not found", 404));
  res.status(200).json({
    status: "success",
    message: "subcategory deleted successfully",
  });
});
