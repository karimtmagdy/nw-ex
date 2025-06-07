const express = require("express");
const router = express.Router();

const { isStaff, authorize, onlyAdmin } = require("../middleware/auth");

const {
  getAllBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  getSingleBrand,
} = require("../services/brand.service");
const { validID } = require("../middleware/validate");
const {
  validateBrandId,
  validateBrand,
} = require("../validator/brand.validate");

router
  .route("/")
  .post([authorize, isStaff], validateBrand, createBrand)
  .get(getAllBrands);

router
  .route("/:id")
  .get(validID, getSingleBrand)
  .patch([authorize, onlyAdmin], validateBrandId, updateBrand)
  .delete([authorize, onlyAdmin], validateBrandId, deleteBrand);

module.exports = router;
