const { Brand } = require("../models/Brand");
const { fn, paginate } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const { VALID } = require("../lib/status/msg-status");

exports.createBrand = fn(async (req, res, next) => {
  const { name ,isActive} = req.body;
  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) return next(new AppError(VALID.brand_exist, 400));
  const brand = await Brand.create({ name,isActive });
  if(isActive==false)   brand.status='inactive'
  await brand.save();
  res.status(201).json({
    status: "success",
    message: VALID.brand_created,
    brand,
  });
});

exports.getAllBrands = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Brand.countDocuments();
  const brands = await Brand.find().skip(skip).limit(limit).lean();
  if (!brands) return next(new AppError("No brands found", 404));
  res.status(200).json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    brands,
  });
});

exports.updateBrand = fn(async (req, res, next) => {
  const { name, description, image, isActive } = req.body;
  // Build brand object
  const brandFields = {};
  if (name) brandFields.name = name;
  if (description) brandFields.description = description;
  if (image) brandFields.image = image;
  if (isActive !== undefined) brandFields.isActive = isActive;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { $set: brandFields },
    { new: true, runValidators: true }
  );
  if (!brand) return next(new AppError(VALID.brand_not, 404));
  await brand.save();
  res.status(200).json({
    status: "success",
    message: VALID.brand_updated,
    brand,
  });
});

exports.getSingleBrand = fn(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById({ _id: id });
  if (!brand) return next(new AppError(VALID.brand_not, 404));
  res.status(200).json({ status: "success", brand });
});
exports.deleteBrand = fn(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) return next(new AppError(VALID.brand_not, 404));
  res.status(200).json({
    status: "success",
    message: VALID.brand_removed,
  });
});
