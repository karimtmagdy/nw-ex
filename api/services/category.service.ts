import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { Category } from "../models/Category";
import { ICategory } from "../types/CategoryType";
import { Request, Response, NextFunction } from "express";

export const createCategory = fn(
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

export const getAllCategories = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
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
// @route   PATCH api/v1/categories/:id
// @desc    Patch a category
// @access  Private/admin
export const updateCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { name, image, isActive }: ICategory = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
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
// @route   GET api/v1/categories/:id
// @desc    Get a category
// @access  Private/admin
export const singleCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new AppError("Category not found", 404));
    res.status(200).json({ status: "success", category });
  }
);
// @route   DELETE api/v1/categories/:id
// @desc    Delete a category
// @access  Private/admin
export const deleteCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return next(new AppError("Category not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "Category has been deleted" });
  }
);
