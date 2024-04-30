// Route file for defining image-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ImageController from "../controllers/imageController.js"; // Import the ImageController for handling image-related logic
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authentication middleware
import Parser from "../config/multerConfig.js"; // Import the Multer configuration for handling file uploads

const router = express.Router(); // Create a new router instance

router
  // Route for uploading images for a specific product
  .post(
    "/upload/:productId", // Define the route path with a parameter for the product ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.array("images", 5), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
    ImageController.uploadImage // Call the uploadImage method from the ImageController to handle the request
  )

  // Route for replacing an existing image
  .post(
    "/replace/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.single("images"), // Use Multer middleware to parse multipart form data with single file field name "images"
    ImageController.updateImage // Call the updateImage method from the ImageController to handle the request
  )

  // Route for deleting an image
  .post(
    "/delete/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    ImageController.deleteImage // Call the deleteImage method from the ImageController to handle the request
  );

export default router; // Export the router instance
