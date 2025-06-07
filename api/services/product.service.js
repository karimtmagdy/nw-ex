const { fn } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const { Product } = require("../models/Product");

// @access  Private
exports.createProduct = fn(async (req, res, next) => {
  const { name, description, price, quantity, status } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    status,
  });
  if (status === "published") {
    product.published = true;
    product.draft = false;
  }
  await product.save();
  return res.status(201).json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});
// @access  Public
exports.getAllProducts = fn(async (req, res, next) => {
  const status = req.query.status;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const userRole = req.user?.role ;
  const allowedStatuses = ["draft", "published", "archived"];
  const filter = {};
//   if (status && ["draft", "published", "archived"].includes(status)) {
//     filter.status = status;
//   }
//   if (status && !["draft", "published", "archived"].includes(status)) {
//     return next(new AppError("Invalid status", 400));
//   }
console.log(req.user?.role)
  if (userRole === "admin") {
    console.log(userRole)
    if (status && allowedStatuses.includes(status)) {
      filter.status = status;
    }
  } else {
    filter.status = "published";
  }
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
  if (!products) return next(new AppError("No products found", 404));
  res.status(200).json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    products,
  });
});

// @access  Public
exports.getProductById = fn(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id }).exec();
  if (!product) return next(new AppError("Product not found", 404));
  res.status(200).json({ status: "success", product });
});
// @access  Private
exports.updateProduct = fn(async (req, res, next) => {});
// @access  Private
exports.deleteProduct = fn(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });
  if (!product) return next(new AppError("Product not found", 404));
  res
    .status(200)
    .json({ status: "success", message: "Product deleted successfully" });
});
