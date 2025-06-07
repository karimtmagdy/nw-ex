const GENDER_TYPES = Object.freeze({
  MALE: "male",
  FEMALE: "female",
});
const USER_ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  MANAGER: "manager",
  MODERATOR: "moderator",
});
const USER_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  BANNED: "banned",
  SUSPENDED: "suspended",
});
const ONLINE_STATUS = Object.freeze({
  ONLINE: "online",
  OFFLINE: "offline",
});
exports.GENDER_TYPES = GENDER_TYPES;
exports.USER_ROLES = USER_ROLES;
exports.USER_STATUS = USER_STATUS;
exports.ONLINE_STATUS = ONLINE_STATUS;

const Validation = Object.freeze({
  forbidden: "Access denied. Admin privileges required",
});
exports.Validation = Validation;