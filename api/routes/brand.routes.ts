import {
  brandSchema,
  singleBrandSchema,
  updateBrandSchema,
} from "../validator/brand.zod";
import { validate, validateParams } from "../middleware/validate";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  singleBrand,
  updateBrand,
} from "../services/brand.service";
import { Router } from "express";
import { authorize, onlyAdmin } from "../middleware/is-verify";
const router = Router();

router.route("/").post(validate(brandSchema), createBrand).get(getAllBrands);
router
  .route("/:id")
  .get(validateParams(singleBrandSchema), singleBrand)
  .patch([authorize, onlyAdmin], validate(updateBrandSchema), updateBrand)
  .delete(
    [authorize, onlyAdmin],
    validateParams(singleBrandSchema),
    deleteBrand
  );

export { router as brandRouter };
