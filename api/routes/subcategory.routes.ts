import {
  singleSubcategorySchema,
  SubcategorySchema,
  updateSubcategorySchema,
} from "../validator/subcategory.zod";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  singleSubCategory,
  updateSubCategory,
} from "../services/subcategory.service";
import { Router } from "express";
import { validate, validateParams } from "../middleware/validate";
import { authorize, onlyAdmin } from "../middleware/is-verify";
const router = Router();

router
  .route("/")
  .post([authorize, onlyAdmin], validate(SubcategorySchema), createSubCategory)
  .get(getAllSubCategories);
router
  .route("/:id")
  .get(validateParams(singleSubcategorySchema), singleSubCategory)
  .patch(
    [authorize, onlyAdmin],
    validateParams(updateSubcategorySchema),
    updateSubCategory
  )
  .delete(
    [authorize, onlyAdmin],
    validateParams(singleSubcategorySchema),
    deleteSubCategory
  );

export { router as subcategoryRouter };
