const { Router } = require("express");
const { GoogleService } = require("../services/robot/google.service");

const router = Router();

// router.route("/").get()
router.post("/gemini", GoogleService);
router.route("/:id").get().post().put().delete();

module.exports = router;
