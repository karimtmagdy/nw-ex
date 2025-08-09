import { IBrand } from "@/types/BrandType";
import * as z from "zod";
import { ObjectIdSchema } from "../middleware/validate";

export const BrandSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "brand name is required" })
    .min(2, { message: "brand name must be at least 2 characters long" })
    .max(30, { message: "brand name must be less than 30 characters long" }),
  status: z.enum(["active", "inactive"]).default("active"),
  isActive: z.boolean().default(true),
  image: z.string().optional(),
}) satisfies z.ZodType<z.infer<IBrand>>;

 

const UpdateBrandSchema = BrandSchema.partial().extend({
  _id: ObjectIdSchema,
});
 