import Shop from "../models/schemaFiles/shopSchema.js"; // Importing the user model
import User from "../models/schemaFiles/userSchema.js";
import jwt from "jsonwebtoken"; // Importing JWT for token generation and verification
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing and comparison
import dotenv from "dotenv"; // Importing dotenv for environment variables
import path, { join } from "path"; // Importing path module for file path manipulation
import { ShopImage, ShopBanner } from "../models/schemaFiles/imagesSchema.js"; // Import the ProductImages model for interacting with image data
import { v2 as cloudinary } from "cloudinary"; // Import the Cloudinary library for image upload

// Loading environment variables from .env file
dotenv.config({ path: "./config/.env" }); // Specifying the path to the .env file

// Setting __dirname
const __dirname = path.resolve(); // Resolving the directory name

const ShopController = {
  // Create Shop
  register: async (req, res) => {
    try {
      const userId = req.user._id; // Extract the product ID from the request parameters
      console.log("UserID:", userId);
      if (req.user.membership?.haveShop) {
        return res.status(403).json({
          message: "You already operate a Shop",
        });
      }
      const {
        name,
        avatar,
        banner,
        description,
        categories,
        products,
        ratings,
        location,
        taxId,
      } = req.body;

      const existingShop = await Shop.findOne({ name });
      if (existingShop) {
        return res
          .status(400)
          .json({ message: "This shop name is already registered" });
      }
      //   const newShop = new Shop(shopData);

      // Destructure request body

      // Create a new product instance with the IDs of the image objects
      const newShop = new Shop({
        name,
        owner: userId,
        avatar,
        banner,
        description,
        categories,
        products,
        ratings,
        location,
        taxId,
      });

      const savedShop = await newShop.save();

      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "membership.shopId": newShop._id,
            "membership.haveShop": true,
          },
        },
        { new: true }
      );

      res.status(201).json({
        message: "You registered your Shop successfully",
        shop: savedShop,
      });
    } catch (error) {
      console.error("Error registering this Shop", error);
      res
        .status(500)
        .json({ message: "An error occurred while registering this Shop" });
    }
  },

  getShopInfo: async (req, res) => {
    try {
      const shopId = req.params.shopId; // Get the shop ID from request parameters

      // Find the shop by its ID
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      // Return the shop information
      res.status(200).json({ shop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update Shop
  // Get Shop by ID
  // Get Shops by Owner
  // Search Shops
  // Delete Shop
  // Shop Verification
  // Authorization

  // Add Shop Avatar
  uploadShopImage: async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const file = req.file; // Get the uploaded file from the request

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Fetch the user document by its ID
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      // Check if the shop already has a profile image
      const existingShopImage = shop.avatar;

      if (existingShopImage === "6644919621f44c996153d424") {
        const newShopImage = new ShopImage();
        // Upload the new file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { gravity: "auto", height: 1000, width: 1000, crop: "fill" },
            { effect: "sharpen" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        console.log("publicId", result);

        newShopImage.public_id = result.public_id;
        newShopImage.version_id = result.version_id;
        newShopImage.signature = result.signature;
        newShopImage.width = result.width;
        newShopImage.height = result.height;
        newShopImage.format = result.format;
        newShopImage.resource_type = result.resource_type;
        newShopImage.tags = result.tags;
        newShopImage.url = result.url;

        await newShopImage.save();

        // Update the shop's avatar and avatarUrl fields using findByIdAndUpdate
        shop.avatar = newShopImage._id;
        shop.avatarUrl = newShopImage.url;

        await shop.save();
      } else {
        const oldShopImage = await ShopImage.findById(existingShopImage);
        // Delete the existing profile image from Cloudinary
        await cloudinary.uploader.destroy(oldShopImage.public_id);

        // Upload the new file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { gravity: "auto", height: 1000, width: 1000, crop: "fill" },
            { effect: "sharpen" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

        // Update the existing profile image with the new information
        Object.assign(oldShopImage, {
          public_id: result.public_id,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          tags: result.tags,
          url: result.url,
        });

        // Save the updated profile image
        await oldShopImage.save();
        // Update the user's profile avatar
        shop.avatarUrl = oldShopImage.url;

        // Save the updated user
        await shop.save();
      }

      return res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Add Shop Banner
  uploadBannerImage: async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const file = req.file; // Get the uploaded file from the request

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Fetch the user document by its ID
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      // Find the existing profile image in the database
      //const existingShopBanner = await ShopBanner.findById(shop.banner);
      const existingShopBanner = shop.banner;
      if (existingShopBanner === "6644933621f44c996153d426") {
        const newShopBanner = new ShopBanner();
        // Upload the new file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { gravity: "auto", height: 300, width: 1900, crop: "auto_pad" },
            { effect: "sharpen" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        console.log("publicId", result);

        newShopBanner.public_id = result.public_id;
        newShopBanner.version_id = result.version_id;
        newShopBanner.signature = result.signature;
        newShopBanner.width = result.width;
        newShopBanner.height = result.height;
        newShopBanner.format = result.format;
        newShopBanner.resource_type = result.resource_type;
        newShopBanner.tags = result.tags;
        newShopBanner.url = result.url;

        await newShopBanner.save();

        // Update the shop banner
        shop.banner = newShopBanner._id;
        shop.bannerUrl = newShopBanner.url;

        await shop.save();
      } else {
        const oldShopBanner = await ShopBanner.findById(existingShopBanner);
        // Delete the existing profile Banner from Cloudinary

        await cloudinary.uploader.destroy(oldShopBanner.public_id);

        // Upload the new file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { gravity: "auto", height: 300, width: 1900, crop: "auto_pad" },
            { effect: "sharpen" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

        // Update the existing profile Banner with the new information
        Object.assign(oldShopBanner, {
          //public_id: result.public_id,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          tags: result.tags,
          url: result.url,
        });

        // Save the updated profile Banner
        await oldShopBanner.save();

        // Update the shop's banner and bannerUrl fields
        shop.bannerUrl = oldShopBanner.url;

        // Save the updated shop
        await shop.save();
      }

      return res.status(201).json({ message: "Banner uploaded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default ShopController;
