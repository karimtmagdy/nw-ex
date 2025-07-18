const { z } = require("zod");
const { validate } = require("../middlewares/validate");

const createBrandSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "brand name is required" })
    .min(2, { message: "brand name must be at least 2 characters long" })
    .max(30, { message: "brand name must be less than 30 characters long" }),
  // description: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  isActive: z.boolean().default(true),
  image: z.string().optional(),
});

const updateBrandSchema = z.object({
  // id: z.string(),
  name: z
    .string()
    .nonempty({ message: "brand name is required" })
    .min(3, { message: "brand name must be at least 3 characters long" })
    .max(32, { message: "brand name must be less than 32 characters long" }),
  // description: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active").optional(),
  isActive: z.boolean().default(true).optional(),
});
module.exports = {
  validateBrandCreate: validate(createBrandSchema),
  validateBrandUpdate: validate(updateBrandSchema),
};
