// Controller file for handling image-upload-related logic.

//  Importing necessary dependencies
import {
  ProductImages,
  ProfileImage,
  ShopImages,
} from "../models/schemaFiles/imagesSchema.js";
import { v2 as cloudinary } from "cloudinary";

const ImageController = {
  uploadProductImage: async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const productImagesIds = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        const productImage = await ProductImages.create({
          url: result.secure_url,
          productId: null,
        });
        productImagesIds.push(productImage._id);
      }
      return res.status(201).json(productImagesIds);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  uploadProfileImage: async (req, res) => {},

  uploadShopImage: async (req, res) => {},

  updateProfileImage: async (req, res) => {},

  updateShopImage: async (req, res) => {},

  deleteImage: async (req, res) => {},

  checkForDuplicate: async (req, res) => {},
};

export default ImageController;
