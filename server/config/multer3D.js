// Multer config file

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config(); // Specifying the path to the .env file

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Multer storage and upload for digital files
var storage3D = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "raw", // Set resource_type to "raw" to handle non-image files
    folder: "digital-files", // Optional: Set a folder to organize uploaded files
    allowedFormats: ["obj", "stl"], // Adjust allowedFormats to include 3D file formats
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname}`;
    },
  },
});

const Parser3D = multer({ storage3D });
export default Parser3D;
