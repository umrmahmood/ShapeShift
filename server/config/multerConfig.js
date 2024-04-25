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

// Define Multer storage and upload
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname}`;
    },
  },
});

const Parser = multer({ storage });
export default Parser;
