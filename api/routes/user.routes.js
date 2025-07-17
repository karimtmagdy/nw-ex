const { Router } = require("express");
const router = Router();
const {
  deleteUser,
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../services/user.service");
const { validID } = require("../middleware/validate");
const {
  validateUserCreate,
  validateUserUpdate,
} = require("../validator/user.validate");
// router.use([authorize]);
router.route("/").get(getAllUsers).post(validateUserCreate, createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .patch(validID, validateUserUpdate, updateUser)
  .delete(validID, deleteUser);
router.route("/me").get().patch().delete();
module.exports = router;
