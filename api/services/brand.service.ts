import { IBrand } from "../types/BrandType";
import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { Brand } from "../models/Brand";
import { Request, Response, NextFunction } from "express";
export const createBrand = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, isActive } = req.body;
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) return next(new AppError("brand already exist", 400));
    const brand = await Brand.create({ name, isActive });
    if (isActive == false) brand.status = "inactive";
    await brand.save();
    res.status(201).json({
      status: "success",
      message: "brand has been created",
      brand,
    });
  }
);

export const getAllBrands = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
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
  }
);

export const updateBrand = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, isActive }: Pick<IBrand, "name" | "isActive"> = req.body;

    const brand = await Brand.findByIdAndUpdate(
      id,
      { $set: { name, isActive } },
      { new: true, runValidators: true }
    );
    if (!brand) return next(new AppError("brand not found", 404));
    if (isActive === false) brand.status = "inactive";
    if (isActive === true) brand.status = "active";
    await brand.save();
    res
      .status(200)
      .json({ status: "success", message: "brand has been updated", brand });
  }
);

export const singleBrand = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findById({ _id: id });
    if (!brand) return next(new AppError("brand not found", 404));
    res.status(200).json({ status: "success", brand });
  }
);
export const deleteBrand = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) return next(new AppError("brand not found", 404));
    res.status(200).json({
      status: "success",
      message: "brand has been deleted",
    });
  }
);
