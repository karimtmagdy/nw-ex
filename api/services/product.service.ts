import { Request, Response, NextFunction } from "express";
import AppError from "../class/api-error";
import { fn } from "../lib/utils";
import { Product } from "../models/Product";
import { IProduct } from "../types/ProductType";

export const createProduct = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, quantity, brand }: IProduct = req.body;
    const payload = { name, description, price, quantity, brand };
    const product = await Product.create(payload);
    //  if(status ==='published') product.published =true
    await product.save();
    res.status(201).json({
      status: "success",
      message: "Product has been created",
      product,
    });
  }
);

export const getAllProducts = fn(
  async (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit).lean();
    if (!products) return next(new AppError("No products found", 404));
    res.status(200).json({
      results: total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      products,
    });
  }
);
export const updateProduct = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
  }
);
export const getSingleProduct = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({ status: "success", product });
  }
);

export const deleteProduct = fn(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return next(new AppError("Product not found", 404));
    res
      .status(200)
      .json({ status: "success", message: "Product has been deleted" });
  }
);

// export const updateProduct = fn(
//   async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const {
//       name,
//       description,
//       price,
//       quantity,
//       discount,
//       category,
//       status,
//       colors,
//       cover,
//       images,
//       published,
//       tags,
//       isActive,
//       subcategory,
//       brand,
//     } = req.body;
//     // const updates = {};
//     // if (name) updates.name = name;
//     // if (description) updates.description = description;
//     // if (price) updates.price = price;
//     // if (quantity) updates.quantity = quantity;
//     // if (category) updates.category = category;
//     // if (status) updates.status = status;
//     // if (tags) updates.tags = tags;
//     // if (isActive) updates.isActive = isActive;
//     // if (brand) updates.brand = brand;
//     // if (subcategory) updates.subcategory = subcategory;
//     // if (discount) updates.discount = discount;
//     // if (colors) updates.colors = colors;
//     // if (cover) updates.cover = cover;
//     // if (images) updates.images = images;
//     // if (published) updates.published = published;
//     const product = await Product.findByIdAndUpdate(
//       { _id: id },
//       {
//         $set: {
//           images,
//         },
//       },
//       { new: true }
//     );
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     return res.status(200).json({
//       status: "success",
//       message: "Product has been updated",
//       product,
//     });
//   }
// );
