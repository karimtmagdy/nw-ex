const multer = require("multer");
const path = require("path");
const { uploadDir } = require("./rules/static-file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
    // cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    // const uuid = nanoid(10);
    // const timestamp = new Date().toISOString().replace(/:/g, "-");
    // const uniqueFilename = `${uuid}-${timestamp}-${file.originalname}`;
    // cb(null, uniqueFilename);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
