import * as z from "zod";
import { Request, Response, NextFunction } from "express";

export const ObjectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.format(),
      });
    }
    req.body = result.data;
    next();
  };
export const validateParams =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }
    (req.params as z.infer<T>) = result.data;
    // Object.assign(req.params, result.data);
    next();
  };

// const getUsersSchema = z.object({
//   page: z.string().optional(),
//   limit: z.string().optional(),
//   search: z.string().optional(),
//   sort: z.string().optional(),
//   order: z.string().optional(),
// });
