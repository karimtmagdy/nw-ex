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

export const uploadImageCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, (error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  });

  return uploadImage;
};
export const cloudinaryRemoveImage = async (public_id: string) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    return error;
  }
};
export const cloudinaryUpload = async (file, folder) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      public_id: file.name,
    });
    return data;
  } catch (error) {
    return error;
  }
};
