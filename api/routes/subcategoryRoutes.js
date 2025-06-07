const express = require("express");
const {
  getAllSubCategories,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
  createSubCategory,
} = require("../services/subcategories.service");
const { isStaff, authorize, onlyAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/").post([authorize, isStaff], createSubCategory).get(getAllSubCategories);
router
  .route("/:id")
  .get(getSubCategoryById)
  .patch([authorize, onlyAdmin], updateSubCategory)
  .delete([authorize, onlyAdmin], deleteSubCategory);

module.exports = router;
