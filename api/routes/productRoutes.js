const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} = require("../services/product.service");
const {
  validateProductCreate,
  validateProductUpdate,
} = require("../validator/product.validation");
const { validID } = require("../middleware/validate");
// const { isStaff, authorize, onlyAdmin } = require("../middleware/auth");
const router = Router();

router
  .route("/")
  .post(validateProductCreate, createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .get(validID, getSingleProduct)
  .patch(validID, validateProductUpdate, updateProduct)
  .delete(validID, deleteProduct);

module.exports = router;
