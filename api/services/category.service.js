const { Category } = require("../models/Category");
const { fn } = require("../lib/utils");
const { AppError } = require("../class/app.error");
const { VALID } = require("../lib/status/msg-status");

exports.createCategory = fn(async (req, res, next) => {
  const { name } = req.body;
  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) return next(new AppError(VALID.category_exist, 400));
  const category = await Category.create({ name });
  await category.save();
  res.status(201).json({
    status: "success",
    message: VALID.category_created,
    category,
  });
});

// @access  Public
exports.getAllCategories = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Category.countDocuments();
  const categories = await Category.find().skip(skip).limit(limit).lean();
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

exports.updateCategory = fn(async (req, res, next) => {
  const { name, image, isActive } = req.body;
  // Build category object
  const categoryFields = {};
  if (name) categoryFields.name = name;
  if (image) categoryFields.image = image;
  if (isActive !== undefined) categoryFields.isActive = isActive;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: categoryFields },
    { new: true, runValidators: true }
  );
  if (!category) return next(new AppError(VALID.category_not, 404));
  await category.save();
  res.status(200).json({
    status: "success",
    message: VALID.category_updated,
    category,
  });
});

exports.getCategoryById = fn(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return next(new AppError(VALID.category_not, 404));
  res.status(200).json({ status: "success", category });
});

exports.deleteCategory = fn(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return next(new AppError(VALID.category_not, 404));
  res.status(200).json({ status: "success", message: VALID.category_removed });
});
