// const { v2: cloudinary } = require("cloudinary");
const cloudinary = require("cloudinary").v2;

const {
  CLOUDINARY_API_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
} = process.env;

module.exports = cloudinary.config({
  cloud_name: CLOUDINARY_API_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});
exports.cloudinaryRemoveImage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);
  return result;
};
// exports.cloudinaryUpload = (file, folder) =>
//   cloudinary.uploader.upload(file, {
//     folder: folder,
//     resource_type: "auto",
//     public_id: file.name,
//   });
