const { fn } = require("../lib/utils");
const authorize = fn(async (req, res, next) => {});
const isStaff = fn(async (req, res, next) => {});
const onlyAdmin = fn(async (req, res, next) => {});

module.exports = { authorize, isStaff, onlyAdmin };
