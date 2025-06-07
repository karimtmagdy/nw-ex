const { z } = require("zod");
const { AppError } = require("../middleware/errorHandler");
const { validate } = require("../middleware/validate");

const subcategorySchema = z.object({
  name: z
    .string()
    .min(3, "SubCategory name must be at least 3 characters")
    .max(32, "SubCategory name must not exceed 32 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

const validateSubCategoryId = (req, res, next) => {
  try {
    const schema = z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid subcategory ID"),
    });
    schema.parse({ id: req.params.id });
    next();
  } catch (error) {
    next(new AppError(error.errors[0].message, 400));
  }
};

module.exports = {
  validateSubCategory: validate(subcategorySchema),
  validateSubCategoryId,
};
