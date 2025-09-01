import { Router } from "express";
import { login, logout, register } from "../services/auth.service";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validator/user.zod";

const router = Router();

router.route("/sign-up").post(validate(registerSchema), register);
router.route("/sign-in").post(validate(loginSchema), login);
router.route("/sign-out").post(logout);

export { router as authRouter };
