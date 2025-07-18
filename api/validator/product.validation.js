const { z } = require("zod");
const { validate } = require("../middlewares/validate");

const createProductSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "product name is required" })
    .min(3, { message: "product name must be at least 3 characters long" })
    .max(100, {
      message: "product name must be less than 100 characters long",
    }),
  description: z.string().optional(),
  price: z
    .number()
    .min(1, { message: "price must be at least 1" })
    .max(200000, {
      message: "price must be less than 200000",
    })
    .nonnegative({ message: "price must be a positive number" }),
  quantity: z
    .number()
    .nonnegative({ message: "quantity must be a positive number" }),
  status: z
    .enum(["published", "draft", "archived", "discontinued"])
    .default("draft"),
  isActive: z.boolean({ coerce: "" }).default(true),
  cover: z.string().optional(),
  category: z.string({ id: z.array() }),
  subcategory: z.string({ id: z.array() }),
  brand: z.string({ id: z.string() }),
});

const updateProductSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nonempty({ message: "product name is required" })
    .min(3, { message: "product name must be at least 3 characters long" })
    .max(100, {
      message: "product name must be less than 100 characters long",
    }),
  description: z.string().optional(),
  price: z
    .number()
    .min(10, { message: "price must be at least 10" })
    .max(200000, {
      message: "price must be less than 200000",
    })
    .nonnegative({ message: "price must be a positive number" }),
  quantity: z
    .number()
    .nonnegative({ message: "quantity must be a positive number" }),
  image: z.string().optional(),
  category: z.object({
    id: z.string()["~validate"]((id) => {
      if (!id) {
        throw new Error("category id is required");
      }
    }),
  }),
  subcategory: z.object({
    id: z.string()["~validate"]((id) => {
      if (!id) {
        throw new Error("sub category id is required");
      }
    }),
  }),
});

module.exports = {
  validateProductCreate: validate(createProductSchema),
  validateProductUpdate: validate(updateProductSchema),
};
