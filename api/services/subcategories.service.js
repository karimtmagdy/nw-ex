const { SubCategory } = require("../models/SubCategory");
const { fn } = require("../lib/utils");
const { AppError } = require("../class/app.error");
const { VALID } = require("../lib/status/msg-status");

exports.createSubCategory = fn(async (req, res, next) => {
  const { name, category } = req.body;
  const existingSubcategory = await SubCategory.findOne({ name });
  if (existingSubcategory)
    return next(new AppError(VALID.subcategory_exist, 400));
  const subcategory = await SubCategory.create({ name, category });
  await subcategory.save();
  res.status(201).json({
    status: "success",
    message: VALID.subcategory_created,
    subcategory,
  });
});

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

exports.updateSubCategory = fn(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    { name, category },
    { new: true, runValidators: true }
  );
  if (!subcategory) return next(new AppError(VALID.subcategory_not, 404));
  await subcategory.save();
  res.status(200).json({
    status: "success",
    message: VALID.subcategory_updated,
    subcategory,
  });
});

exports.getSingleSubCategory = fn(async (req, res, next) => {
  const subcategory = await SubCategory.findById(req.params.id);
  if (!subcategory) return next(new AppError(VALID.subcategory_not, 404));
  res.status(200).json({ status: "success", subcategory });
});

exports.deleteSubCategory = fn(async (req, res, next) => {
  const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subcategory) return next(new AppError(VALID.subcategory_not, 404));
  res
    .status(200)
    .json({ status: "success", message: VALID.subcategory_removed });
});
