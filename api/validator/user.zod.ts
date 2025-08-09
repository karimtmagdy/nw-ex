import { ObjectIdSchema } from "../middleware/validate";
import { IUser, roles, status } from "../types/UserType";
import * as z from "zod";

export const userSchema = z.object<z.input<IUser>>({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .transform((username) => username.trim()),
  email: z
    .email("Invalid email format")
    .nonempty({ message: "Email is required" })
    .trim()
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
  gender: z.enum(["male", "female"]).optional(),
  age: z.number().int().min(12).optional(),
  role: z.enum(roles).default("user"),
  phone: z.string().optional(),
  name: z
    .object({
      firstName: z.string(),
      lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters")
        .max(20, "Last name must be less than 20 characters"),
    })
    .transform((name) => {
      return {
        firstName: name.firstName.trim(),
        lastName: name.lastName.trim(),
      };
    }),
  status: z.enum(status).default("active"),
  active: z.enum(["offline", "online"]).default("offline"),
  photo: z.object({
    url: z.string(),
    publicId: z.string(),
  }),
  verified: z.boolean().default(false),
  rememberMe: z.boolean().default(false),
  isActive: z.boolean().default(false),
  activeAt: z.date().default(new Date()),
  deletedAt: z.date().default(null),
  cart: z
    .array(z.object({ type: z.string(), productId: z.string() }))
    .default([]),
  confirmPassword: z.string(),
}) satisfies z.ZodType<z.infer<IUser>>;

export const registerSchema = userSchema
  .pick({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
export const createUserSchema = userSchema.pick({
  username: true,
  email: true,
  password: true,
  gender: true,
  role: true,
});
export const updateUserSchema = userSchema.pick({
  role: true,
});

export const updatePasswordSchema = userSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const deleteUserSchema = userSchema.pick({}).and(
  z.object({
    id: ObjectIdSchema,
  })
);
export const singleUserSchema = userSchema.pick({}).and(
  z.object({
    id: ObjectIdSchema,
  })
);