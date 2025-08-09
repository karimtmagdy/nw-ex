import multer from "multer";
import path from "path";
import { uploadDir } from "./static-file";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // const uuid = nanoid(10);
    // const timestamp = new Date().toISOString().replace(/:/g, "-");
    // const uniqueFilename = `${uuid}-${timestamp}-${file.originalname}`;
    // cb(null, uniqueFilename);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});
