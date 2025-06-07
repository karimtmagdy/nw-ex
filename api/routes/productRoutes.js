const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../services/product.service");
const { isStaff, authorize, onlyAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/").post([authorize, isStaff], createProduct).get(getAllProducts);
router
  .route("/:id")
  .get()
  .patch([authorize, onlyAdmin])
  .delete([authorize, onlyAdmin]);

module.exports = router;
