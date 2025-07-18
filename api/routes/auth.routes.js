const { Router } = require("express");
const router = Router();
const { login, register, logout } = require("../services/auth.service");
const {
  validateRegister,
  validateLogin,
} = require("../validator/auth.validate");
router.post("/sign-up", validateRegister, register);
router.post("/sign-in", validateLogin, login);
router.post("/sign-out", logout);
module.exports = router;

// const token = pm.response.text();
// console.log(token)
// if (token) {
//   pm.environment.set('token', token)
//   console.log('saved', token)
//   pm.globals.set('token', token)
//   console.log('token global')
// } else {
//   console.log('no token')
// }