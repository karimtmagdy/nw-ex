const { z } = require("zod");
const { AppError } = require("../middleware/errorHandler");
const { validate } = require("../middleware/validate");

const brandSchema = z.object({
  name: z
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name must not exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

const validateBrandId = (req, res, next) => {
  try {
    const schema = z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid brand ID"),
    });
    schema.parse({ id: req.params.id });
    next();
  } catch (error) {
    next(new AppError(error.errors[0].message, 400));
  }
};
const updateBrandSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nonempty({ message: "brand name is required" })
    .min(3, { message: "brand name must be at least 3 characters long" })
    .max(32, { message: "brand name must be less than 32 characters long" }),
  description: z.string().optional(),
  image: z.string().optional(),
});
module.exports = {
  validateBrand: validate(brandSchema),
  validateBrandId,
  updateBrandSchema,
};
const createBrandSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "brand name is required" })
    .min(3, { message: "brand name must be at least 3 characters long" })
    .max(32, { message: "brand name must be less than 32 characters long" }),
  description: z.string().optional(),
  image: z.string().optional(),
});