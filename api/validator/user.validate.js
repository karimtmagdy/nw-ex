const { z } = require("zod");
const { validate } = require("../middlewares/validate");

const createUserSchema = z.object({
  username: z
    .string()
    // .nonempty({ message: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .trim(),
  email: z
    .string()
    // .nonempty({ message: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    // .nonempty({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
  role: z.enum(["user", "admin", "manager", "moderator"]).optional(),
  gender: z.enum(["male", "female"]),
});
const updateUserSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(32, {
      message: "Username must be less than 32 characters long",
    }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
  gender: z.enum(["male", "female"]).optional(),
  role: z.enum(["user", "admin", "manager", "moderator"]).optional(),
  phone: z.string().optional(),
  photo: z.object({
    url: z.string().optional(),
    public_id: z.string().optional(),
  }),
});

module.exports = {
  validateUserCreate: validate(createUserSchema),
  validateUserUpdate: validate(updateUserSchema),
};

// const getUsersSchema = z.object({
//   page: z.string().optional(),
//   limit: z.string().optional(),
//   search: z.string().optional(),
//   sort: z.string().optional(),
//   order: z.string().optional(),
// });
