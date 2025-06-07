const { Category } = require("../models/Category");
const { fn, paginate } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");

// @access  Private
exports.createCategory = fn(async (req, res, next) => {
  const { name } = req.body;
  // Check if category already exists
  let category = await Category.findOne({ name });
  if (category) return next(new AppError("category already exists", 400));
  category = await Category.create({ name });
  await category.save();
  res.status(201).json({
    status: "success",
    message: "category created successfully",
    category,
  });
});

// @access  Public
exports.getAllCategories = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Category.countDocuments();
  const categories = await Category.find().skip(skip).limit(limit);
  if (!categories) return next(new AppError("No categories found", 404));
  res.status(200).json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    categories,
  });

  // const result = await paginate(Category, req.query, page, limit, {
  //   //     isActive: true,
  // });
  // result.categories = result.data;
  // delete result.data;
  // if (!result) return next(new AppError("No categories found", 404));
  // res.status(200).json(result);
});

// @access  Private
exports.updateCategory = fn(async (req, res, next) => {
  const { name, description, image, isActive } = req.body;
  // Build category object
  const categoryFields = {};
  if (name) categoryFields.name = name;
  if (description) categoryFields.description = description;
  if (image) categoryFields.image = image;
  if (isActive !== undefined) categoryFields.isActive = isActive;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: categoryFields },
    { new: true, runValidators: true }
  );
  if (!category) return next(new AppError("category not found", 404));
  await category.save();
  res.status(200).json({
    status: "success",
    message: "category updated successfully",
    category,
  });
});

// @access  Public
exports.getCategoryById = fn(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new AppError("category not found", 404));
  res.status(200).json({
    status: "success",
    category,
  });
});

// @access  Private
exports.deleteCategory = fn(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return next(new AppError("category not found", 404));
  res.status(200).json({
    status: "success",
    message: "category removed",
  });
});
