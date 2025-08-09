import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { Category } from "../models/Category";
import { ICategory } from "../types/CategoryType";
import { Request, Response, NextFunction } from "express";

exports.createCategory = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return next(new AppError("Category already exists", 400));
    const category = await Category.create({ name });
    await category.save();
    res.status(201).json({
      status: "success",
      message: "category has been created",
      category,
    });
  }
);

// @access  Public
exports.getAllCategories = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const page: any = req.query.page || 1;
    const limit: any = req.query.limit || 10;
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
  }
);

exports.updateCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { name, image, isActive }: ICategory = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: { name, image, isActive } },
      { new: true, runValidators: true }
    );
    if (!category) return next(new AppError("Category not found", 404));
    await category.save();
    res.status(200).json({
      status: "success",
      message: "Category has been updated",
      category,
    });
  }
);

exports.singleCategory  = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new AppError("Category not found", 404));
    res.status(200).json({ status: "success", category });
  }
);

exports.deleteCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return next(new AppError("Category not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "Category has been deleted" });
  }
);
