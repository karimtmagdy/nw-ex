import { ISubCategory } from "@/types/SubcategoryType";
import * as z from "zod";
import { ObjectIdSchema } from "../middleware/validate";

export const SubcategorySchema = z.object({
  name: z
    .string()
    .nonempty({ message: "SubCategory name is required" })
    .min(3, "SubCategory name must be at least 3 characters")
    .max(32, "SubCategory name must not exceed 32 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  category: z.array(ObjectIdSchema),
}) satisfies z.ZodType<z.infer<ISubCategory>>;
