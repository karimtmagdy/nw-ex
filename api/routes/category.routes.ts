import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service";
import { validate, validateParams } from "../middleware/validate";
import {
  categorySchema,
  singleCategorySchema,
  updateCategorySchema,
} from "../validator/category.zod";
import { authorize, onlyAdmin } from "../middleware/is-verify";
const router = Router();

router
  .route("/")
  .post([authorize, onlyAdmin], validate(categorySchema), createCategory)
  .get(getAllCategories);
router
  .route("/:id")
  .get(validateParams(singleCategorySchema), singleCategory)
  .patch(
    [authorize, onlyAdmin],
    validateParams(updateCategorySchema),
    updateCategory
  )
  .delete(
    [authorize, onlyAdmin],
    validateParams(singleCategorySchema),
    deleteCategory
  );

export { router as categoryRouter };
