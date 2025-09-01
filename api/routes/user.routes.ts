import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  singleUser,
  updateUser,
} from "../services/user.service";
import { validate, validateParams } from "../middleware/validate";
import {
  createUserSchema,
  singleUserSchema,
  updateUserSchema,
} from "../validator/user.zod";
import { authorize, onlyAdmin } from "../middleware/is-verify";

const router = Router();
router.use([authorize, onlyAdmin]);

router.route("/").post(validate(createUserSchema), createUser).get(getAllUser);
router
  .route("/:id")
  .get(validateParams(singleUserSchema), singleUser)
  .delete(validateParams(singleUserSchema), deleteUser)
  .patch(validate(updateUserSchema), updateUser);

export { router as userRouter };
