import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dfj5cgura",
  api_key: "393453828592943",
  api_secret: "U-RwCuZALDZRnb9HiQwIjrDcAR8",
});

// memory storage
const storage = multer.memoryStorage();

// upload function
async function ImageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

// multer middleware
const upload = multer({ storage });

export { upload, ImageUploadUtils };