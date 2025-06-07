const express = require("express");
const { chatBot } = require("../services/chatbot.service");
const router = express.Router();

const { onlyAdmin } = require("../middleware/auth");

// router.use(onlyAdmin);
router.route("/").post(chatBot);
// router.route("/:id").get().patch().delete();

module.exports = router;
