// Route file for defining image-related endpoints.

// Importing dependencies
import express from "express"; // Import the Express library to create a router

// Importing controllers
import ImageController from "../controllers/imageController.js"; // Import the ImageController for handling image-related logic
import UserController from "../controllers/userController.js"; // Import the UserController for handling user-related logic
import ShopController from "../controllers/shopController.js"; // Import the ShopController to handle shop-related logic

// Importing middleware
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authentication middleware to protect certain routes

// Importing Multer configuration
import Parser from "../config/multerConfig.js"; // Import the Multer configuration for handling file uploads

// Create a new router instance
const router = express.Router();

// Define routes for handling various image-related endpoints
// Product Images Router
router
  // Route for getting a specific product image by image ID
  .get("/:imageId", ImageController.getProductImageById)

  // Route for getting a shop avatar by shop ID
  .get("/shop/avatar/:shopId", ImageController.getShopAvatar)

  // Route for getting a shop banner by shop ID
  .get("/shop/banner/:shopId", ImageController.getShopBanner)

  // Route for getting a user's profile image by profile ID
  .get("/profile/:profileId", UserController.getProfileImage)

  // Route for uploading images for a specific product
  .post(
    "/upload/product/:productId", // Define the route path with a parameter for the product ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.array("images", 5), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
    ImageController.uploadProductImage // Call the uploadProductImage method from the ImageController to handle the request
  )

  // Route for replacing an existing image
  .post(
    "/replace/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.single("images"), // Use Multer middleware to parse multipart form data with single file field name "images"
    ImageController.updateProductImage // Call the updateProductImage method from the ImageController to handle the request
  )

  // Route for deleting an image
  .post(
    "/delete/:imageId", // Define the route path with a parameter for the image ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    ImageController.deleteProductImage // Call the deleteProductImage method from the ImageController to handle the request
  )

  // Profile Image Router
  // Route for uploading a user's profile image
  .post(
    "/upload/profile/:userId", // Define the route path with a parameter for the user ID
    //authMiddleware.authenticated, // Apply authentication middleware to authenticate the user (commented out here)
    Parser.single("image"), // Use Multer middleware to parse multipart form data with file field name "image"
    UserController.uploadProfileImage // Call the uploadProfileImage method from the UserController to handle the request
  )

  // Shop Image
  // Route for uploading a shop image
  .post(
    "/upload/shop/:shopId", // Define the route path with a parameter for the shop ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.single("image"), // Use Multer middleware to parse multipart form data with file field name "image"
    ShopController.uploadShopImage // Call the uploadShopImage method from the ShopController to handle the request
  )

  // Shop Banner
  // Route for uploading a shop banner image
  .post(
    "/upload/shopbanner/:shopId", // Define the route path with a parameter for the shop ID
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.single("image"), // Use Multer middleware to parse multipart form data with file field name "image"
    ShopController.uploadBannerImage // Call the uploadBannerImage method from the ShopController to handle the request
  );

// Export the router instance
export default router;
