import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { Brand } from "../models/Brand";
import { IBrand } from "../types/BrandType";
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
    const page: any = req.query.page || 1;
    const limit: any = req.query.limit || 10;
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
    const { name, description, image, isActive } = req.body;
    // Build brand object
    const brandFields: IBrand = {
      name: "",
      image: "",
      isActive: false,
    };
    if (name) brandFields.name = name;
    if (image) brandFields.image = image;
    if (isActive !== undefined) brandFields.isActive = isActive;

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { $set: brandFields },
      { new: true, runValidators: true }
    );
    if (!brand) return next(new AppError("brand not found", 404));
    await brand.save();
    res.status(200).json({
      status: "success",
      message: "brand has been updated",
      brand,
    });
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
