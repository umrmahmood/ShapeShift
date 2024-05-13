// Route file for defining image-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ImageController from "../controllers/imageController.js"; // Import the ImageController for handling image-related logic
import UserController from "../controllers/userController.js";
import ShopController from "../controllers/shopController.js"; // Importing the ShopController to handle shop-related logic
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authentication middleware
import Parser from "../config/multerConfig.js"; // Import the Multer configuration for handling file uploads


const router = express.Router(); // Create a new router instance

// Product Images Router
router

  .get("/:imageId", ImageController.getProductImageById)
  // Route for uploading images for a specific product
  .get("/:imageId", ImageController.getProductImageById)
  .post(
    "/upload/product/:productId", // Define the route path with a parameter for the product ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.array("images", 5), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
    ImageController.uploadProductImage // Call the uploadImage method from the ImageController to handle the request
  )

  // Route for replacing an existing image
  .post(
    "/replace/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.single("images"), // Use Multer middleware to parse multipart form data with single file field name "images"
    ImageController.updateProductImage // Call the updateImage method from the ImageController to handle the request
  )

  // Route for deleting an image
  .post(
    "/delete/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    ImageController.deleteProductImage // Call the deleteImage method from the ImageController to handle the request
  );

// Profile Image Router
router.post(
  "/upload/profile/:userId", // Define the route path with a parameter for the product ID
  authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
  Parser.single("images"), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
  UserController.uploadProfileImage // Call the uploadImage method from the ImageController to handle the request
);

// Shop Image
router.post(
  "/upload/shop/:shopId", // Define the route path with a parameter for the product ID
  authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
  Parser.single("image"), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
  ShopController.uploadShopImage // Call the uploadImage method from the ImageController to handle the request
);

//get Shop Avatar
router.get("/shop/avatar/:id", ImageController.getShopAvatar)

// Shop Banner
router.post(
  "/upload/shopbanner/:shopId", // Define the route path with a parameter for the product ID
  authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
  Parser.single("image"), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
  ShopController.uploadBannerImage // Call the uploadImage method from the ImageController to handle the request
);

//get Shop Banner
router.get("/shop/banner/:id", ImageController.getShopBanner)

export default router; // Export the router instance
