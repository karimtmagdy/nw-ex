const { Router } = require("express");
const router = Router();

const {
  getAllBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  getSingleBrand,
} = require("../services/brand.service");
const { validID } = require("../middlewares/validate");
const {
  validateBrandUpdate,
  validateBrandCreate,
} = require("../validator/brand.validate");
// const { onlyAdmin } = require("../middleware/auth");

router
  .route("/")
  .post(  validateBrandCreate, createBrand)
  .get(getAllBrands);

router
  .route("/:id")
  .get(validID, getSingleBrand)
  .patch(validateBrandUpdate, updateBrand)
  .delete(validID, deleteBrand);

module.exports = router;
