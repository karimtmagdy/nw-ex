import * as z from "zod";
const { AppError } = require("../middlewares/errorHandler");
const { validate } = require("../middlewares/validate");

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must not exceed 50 characters"),
});

const validateCategoryId = (req, res, next) => {
  try {
    const schema = z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    });
    schema.parse({ id: req.params.id });
    next();
  } catch (error) {
    next(new AppError(error.errors[0].message, 400));
  }
};

module.exports = {
  validateCategory: validate(categorySchema),
  validateCategoryId,
};
