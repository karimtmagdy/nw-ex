import * as z from "zod";
import { ObjectIdSchema } from "../middleware/validate";
import { ICategory } from "../types/CategoryType";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must not exceed 50 characters"),
  isActive: z.boolean().default(true),
  image: z.string().optional(),
}) satisfies z.ZodType<z.infer<ICategory>>;

export const updateCategorySchema = categorySchema.pick({
  name: true,
  isActive: true,
  image: true,
});

export const singleCategorySchema = categorySchema.pick({}).and(
  z.object({
    id: ObjectIdSchema,
  })
);
