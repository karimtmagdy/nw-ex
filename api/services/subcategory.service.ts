import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { SubCategory } from "../models/Subcategory";

import { Request, Response, NextFunction } from "express";
export const createSubCategory = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body;
    const existingSubcategory = await SubCategory.findOne({ name });
    if (existingSubcategory)
      return next(new AppError("Subcategory already exists", 400));
    const subcategory = await SubCategory.create({ name, category });
    await subcategory.save();
    res.status(201).json({
      status: "success",
      message: "subcategory has been created",
      subcategory,
    });
  }
);

export const getAllSubCategories = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const page: any = req.query.page || 1;
    const limit: any = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const total = await SubCategory.countDocuments();
    const subcategories = await SubCategory.find().skip(skip).limit(limit);
    if (!subcategories)
      return next(new AppError("No subcategories found", 404));
    res.status(200).json({
      results: total,
      page,
      pages: Math.ceil(total / limit),
      subcategories,
    });
  }
);

export const updateSubCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { name, category } = req.body;
    const subcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true, runValidators: true }
    );
    if (!subcategory) return next(new AppError("Subcategory not found", 404));
    await subcategory.save();
    res.status(200).json({
      status: "success",
      message: "Subcategory has been updated",
      subcategory,
    });
  }
);

export const singleSubCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) return next(new AppError("Subcategory not found", 404));
    res.status(200).json({ status: "success", subcategory });
  }
);

export const deleteSubCategory = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return next(new AppError("Subcategory not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "Subcategory has been deleted" });
  }
);
