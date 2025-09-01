import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../services/product.service";
import { validate, validateParams } from "../middleware/validate";
import {
  productSchema,
  singleProductSchema,
  updateProductSchema,
} from "../validator/product.zod";
import { authorize, onlyAdmin } from "../middleware/is-verify";
const router = Router();

router
  .route("/")
  .post([authorize, onlyAdmin], validate(productSchema), createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .get(validateParams(singleProductSchema), getSingleProduct)
  .patch([authorize, onlyAdmin], validate(updateProductSchema), updateProduct)
  .delete(
    [authorize, onlyAdmin],
    validateParams(singleProductSchema),
    deleteProduct
  );

export { router as productRouter };
