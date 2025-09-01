import { Router } from "express";

// const { upload } = require("../config/multer");
// // import { upload } from "../fold/nodejs/multerConfig.js";

const router = Router();

// router.post("/", upload.single("image"), (req, res) => {
//   return res.status(200).json({ message: "Upload successfully" });
// });

export { router as uploadRouter };
