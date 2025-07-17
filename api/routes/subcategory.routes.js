const express = require("express");
const {
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  createSubCategory,
  getSingleSubCategory,
} = require("../services/subcategories.service");
const { validID } = require("../middleware/validate");
const {
  validateSubCategoryCreate,
} = require("../validator/subcategory.validate");
// const { isStaff, authorize, onlyAdmin } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .post(validateSubCategoryCreate, createSubCategory)
  .get(getAllSubCategories);
router
  .route("/:id")
  .get(validID, getSingleSubCategory)
  .patch(validID, updateSubCategory)
  .delete(validID, deleteSubCategory);

module.exports = router;
