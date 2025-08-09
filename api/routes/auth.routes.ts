import { Router } from "express";
import { login, register } from "../services/auth.service";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validator/user.zod";

const router = Router();

router.route("/sign-up").post(validate(registerSchema), register);
router.route("/sign-in").post(validate(loginSchema), login);

export { router as authRouter };
