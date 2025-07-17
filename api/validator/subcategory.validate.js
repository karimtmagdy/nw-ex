const { z } = require("zod");

const { validate } = require("../middleware/validate");

const createSubcategorySchema = z.object({
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

module.exports = {
  validateSubCategoryCreate: validate(createSubcategorySchema),
};
