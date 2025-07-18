const { Router } = require("express");
const { GoogleService } = require("../services/robot/google.service");
const { OpenAIService } = require("../services/robot/openai.service");

const router = Router();

// router.route("/").get()
router.post("/gemini", GoogleService);
router.post("/openai", OpenAIService);
router.post("/deepseek", OpenAIService);
router.route("/:id").get().post().put().delete();

module.exports = router;
