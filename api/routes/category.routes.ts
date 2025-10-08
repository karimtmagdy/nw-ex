import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  deleteMultipleCategory,
  getAllCategories,
  singleCategory,
  updateCategory,
} from "../services/category.service";
import { validate, validateParams } from "../middleware/validate";
import {
  categorySchema,
  multipleCategoriesSchema,
  singleCategorySchema,
  updateCategorySchema,
} from "../validator/category.zod";
// import { authorize, onlyAdmin } from "../middleware/is-verify";
const router = Router();
// [authorize, onlyAdmin],
router
  .route("/")
  .post(validate(categorySchema), createCategory)
  .get(getAllCategories);
router
  .route("/:id")
  .get(validateParams(singleCategorySchema), singleCategory)
  .patch(validateParams(updateCategorySchema), updateCategory)
  .delete(validateParams(singleCategorySchema), deleteCategory);
router
  .route("/:bulk-delete")
  .delete(validateParams(multipleCategoriesSchema), deleteMultipleCategory);
export { router as categoryRouter };
