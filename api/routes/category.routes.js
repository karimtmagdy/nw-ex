const express = require("express");
const router = express.Router();

const { isStaff, authorize, onlyAdmin } = require("../middlewares/auth");
const {
  createCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../services/category.service");
const {
  validateCategory,
  validateCategoryId,
} = require("../validator/category.validate");
const { validID } = require("../middlewares/validate");

router
  .route("/")
  .post([authorize, isStaff], validateCategory, createCategory)
  .get(getAllCategories);

router
  .route("/:id")
  .delete([authorize, onlyAdmin], validateCategoryId, deleteCategory)
  .get(validID, getCategoryById)
  .patch([authorize, onlyAdmin], validateCategoryId, updateCategory);

module.exports = router;
