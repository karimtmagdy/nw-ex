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
  deleteUserSchema,
  singleUserSchema,
  updateUserSchema,
} from "../validator/user.zod";
// import { authorize } from "../middleware/is-verify";

const router = Router();
// router.use([authorize]);

router.route("/").post(validate(createUserSchema), createUser).get(getAllUser);
router
  .route("/:id")
  .get(validateParams(singleUserSchema), singleUser)
  .delete(validateParams(deleteUserSchema), deleteUser)
  .patch(validate(updateUserSchema), updateUser);

export { router as userRouter };
