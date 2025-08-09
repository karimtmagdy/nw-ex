import { v2 as cloudinary } from "cloudinary";
const {
  CLOUDINARY_API_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_API_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});
export const cloudinaryRemoveImage = (public_id: string) => {
  return cloudinary.uploader.destroy(public_id);
};
// exports.cloudinaryUpload = (file, folder) =>
//   cloudinary.uploader.upload(file, {
//     folder: folder,
//     resource_type: "auto",
//     public_id: file.name,
//   });