import { IProduct } from "../types/ProductType";
import * as z from "zod";
import { ObjectIdSchema } from "../middleware/validate";

export const productSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "product must have a name" })
    .min(2, { message: "product name must be at least 2 characters long" })
    .max(100, {
      message: "product name must be less than 100 characters long",
    }),
  description: z
    .string()
    .nonempty({ message: "product must have a description" })
    .min(20, {
      message: "product description must be at least 20 characters long",
    })
    .max(1000, {
      message: "product description must be less than 1000 characters long",
    }),
  price: z
    .float32()
    .min(1, { message: "price must be at least 1" })
    .max(200000, { message: "price must be less than 200000" })
    .positive()
    .nonnegative({ message: "price must be a positive number" }),
  colors: z.array(z.string()).max(5, { message: "" }),
  cover: z.string().optional(),
  sold: z.number().int().positive().default(0),
  images: z.array(z.string()).max(5, { message: "" }).optional(),
  views: z.number().int().default(0),
  likes: z.number().int().default(0),
  discount: z
    .number()
    .int()
    .min(0, { message: "" })
    .max(100, { message: "" })
    .default(0),
  isActive: z.boolean().default(true),
  published: z.boolean().default(false),
  quantity: z
    .number()
    .int()
    .positive()
    .nonnegative({ message: "quantity must be a positive number" })
    .default(0),
  rating: z
    .number()
    .int()
    .positive()
    .min(1, { message: "" })
    .max(5, { message: "" })
    .default(0),
  PriceAfterDiscount: z.number().int(),
  category: z.array(z.string()),
  subcategory: z.array(z.string()),
  brand: z.string(),
  reviews: z.array(z.string()),
  // status: z.enum(["active", "inactive"]).default("active"),
}) satisfies z.ZodType<z.infer<IProduct>>;

export const updateProductSchema = productSchema.pick({
  name: true,
  description: true,
  price: true,
  colors: true,
  cover: true,
  images: true,
  discount: true,
  isActive: true,
  published: true,
  quantity: true,
  category: true,
  subcategory: true,
  brand: true,
  reviews: true,
});

export const singleProductSchema = productSchema.pick({}).and(
  z.object({
    id: ObjectIdSchema,
  })
);
