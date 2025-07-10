const { fn } = require("../lib/utils");
const { AppError } = require("../middleware/errorHandler");
const { Product } = require("../models/Product");
const { VALID } = require("../lib/status/msg-status");
exports.createProduct = fn(async (req, res, next) => {
  // brand, category, subcategory,
  const { name, description, price, quantity, status } = req.body;
  const payload = { name, description, price, quantity, status };
  const product = await Product.create(payload);
  if (status === "published") {
    product.published = true;
  }
  await product.save();
  return res.status(201).json({
    status: "success",
    message: VALID.product_created,
    product,
  });
});
exports.deleteProduct = fn(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });
  if (!product) return next(new AppError(VALID.product_not, 404));
  res.status(200).json({ status: "success", message: VALID.product_removed });
});
exports.getSingleProduct = fn(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id }).exec();
  if (!product) return next(new AppError(VALID.product_not, 404));
  res.status(200).json({ status: "success", product });
});
exports.updateProduct = fn(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    quantity,
    discount,
    category,
    status,
    colors,
    cover,
    images,
    published,
    tags,
    isActive,
    subcategory,
    brand,
  } = req.body;
  const updates = {};
  if (name) updates.name = name;
  if (description) updates.description = description;
  if (price) updates.price = price;
  if (quantity) updates.quantity = quantity;
  if (category) updates.category = category;
  if (status) updates.status = status;
  if (tags) updates.tags = tags;
  if (isActive) updates.isActive = isActive;
  if (brand) updates.brand = brand;
  if (subcategory) updates.subcategory = subcategory;
  if (discount) updates.discount = discount;
  if (colors) updates.colors = colors;
  if (cover) updates.cover = cover;
  if (images) updates.images = images;
  // if (published) updates.published = published;
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    { $set: updates },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: VALID.product_not });
  return res
    .status(200)
    .json({ status: "success", message: VALID.product_updated, product });
});

exports.getAllProducts = fn(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments();
  const products = await Product.find().skip(skip).limit(limit).lean().exec();
  if (!products) return next(new AppError("No products found", 404));
  res.status(200).json({
    results: total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    products,
  });
});
