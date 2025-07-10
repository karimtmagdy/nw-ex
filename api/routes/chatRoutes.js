const { Router } = require("express");
const {
  createChat,
  getChat,
  getSingleChat,
} = require("../services/chat.service");
const { getDeepSeekResponse } = require("../services/deepseek.service");

const router = Router();

router.route("/").post(getDeepSeekResponse).get(getChat);

router.route("/:id").delete().get(getSingleChat).patch();

module.exports = router;
