const removed = "has been removed";
const created = "has been created";
const updated = "has been updated";
const exists = "already exists";
const not = "not found";
const failed = "failed to update";

//! -----------------------------------product
exports.MSG_PRODUCT = Object.freeze({
  product_exist: `product ${exists}`,
  product_created: `product ${created}`,
  product_updated: `product ${updated}`,
  product_removed: `product ${removed}`,
  product_not: `product ${not}`,
});
//! -----------------------------------category
exports.MSG_CATEGORY = Object.freeze({
  category_created: `category ${created}`,
  category_updated: `category ${updated}`,
  category_not: `category ${not}`,
  category_exist: `category ${exists}`,
  category_removed: `category ${removed}`,
});
//! -----------------------------------subcategory
exports.MSG_SUBCATEGORY = Object.freeze({
  subcategory_created: `sub category ${created}`,
  subcategory_updated: `sub category ${updated}`,
  subcategory_not: `sub category ${not}`,
  subcategory_exist: `sub category ${exists}`,
  subcategory_removed: `sub category ${removed}`,
});
exports.MSG_BRAND = Object.freeze({
  brand_created: `brand ${created}`,
  brand_updated: `brand ${updated}`,
  brand_removed: `brand ${removed}`,
  brand_not: `brand ${not}`,
  brand_exist: `Brand ${exists}`,
});
//! -----------------------------------user
exports.MSG_USER = Object.freeze({
  user_exist: `user ${exists}`,
  user_created: `user ${created}`,
  user_updated: `user ${updated}`,
  user_removed: `user ${removed}`,
  user_not: `user ${not}`,
});
//! -----------------------------------admin
exports.MSG_ADMIN = Object.freeze({});
exports.VALIDATION_ADMIN = Object.freeze({});
exports.ERROR = Object.freeze({});
exports.VALIDATION = Object.freeze({});
exports.VALID = Object.freeze({
  forbidden: "Access denied. Admin privileges required",
  admin: "Access denied",
  user_invalid: "Invalid credentials",
  registered: "User registered successfully",
  loggedIn: "User Logged in successfully",
  loggedOut: "User Logged out successfully",
  no_token: "",
  not_active: "Your account is not active",
  // user_created: "Your account has been activated",
  //$ -----------------------------------
});
// export const Validation = Object.freeze({
//   credentials: "invalid credentials",
//   expired_token: "invalid or expired token please login again",
//   sign_out: "logged out successfully",
//   unauthorized: "Unauthorized you're not authenticated please try again.",
//   forbidden:
//     "forbidden access denied: Sorry, you don't have permission to access this page.",
//   only_admin: "forbidden access restricted: Admins only.",
//   actually: "unauthorized actually",
//   user_exist: "user already exists",
//   user_created: "user created successfully",
//   user_updated: "user updated successfully",
//   user_deleted: "user deleted successfully",
//   already_out: "user already signed out",
//   invalid_auth:
//     "You need to sign in to access this page. Your session may have expired or you haven't logged in yet.",
//   not_available: "not available!",
//   // invalid: "",
//   own_invalid: "You can only access your own data.",
//   failed_create: "failed to create",
//   no_refresh:'No refresh token provided',
//   invalid_refresh:'Invalid refresh token',
//   // invalid_token:'invalid token',
//   // invalid_email:'invalid email',
//   refresh_success: "Token refreshed successfully",
// });
// // export const verification_failed = "Token verification failed. Access denied.";
// // "your not login please login to get access to this route"
