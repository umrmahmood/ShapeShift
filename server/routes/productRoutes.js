// Route file for defining product-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ProductController from "../controllers/productController.js"; // Import the ProductController for handling product-related logic
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authentication middleware
import Parser from "../config/multerConfig.js"; // Import the Multer configuration for handling file uploads

// Creating an instance of Express router
const router = express.Router(); // Create a new router instance

// Route for fetching all products and by ID
router
  .get("/", ProductController.getAllProducts) // Define a GET request to fetch all products
  .get("/:productId", ProductController.getProductById) // Define a GET request to fetch a specific product by ID
  .get("/listings/:sellerId", ProductController.getProductsBySellerId); //get request for All the products by a specific seller.

// Routes for creating, updating, and deleting products
router
  // Apply authenticated middleware only to the routes below
  .post(
    "/create", // Define the route path for creating a new product
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    Parser.array("images", 5), // Use Multer middleware to parse multipart form data with file field name "images" and limit to 5 files
    ProductController.createProduct // Call the createProduct method from the ProductController to handle the request
  ) // Define a POST request to create a new product
  .put(
    "/:productId", // Define the route path with a parameter for the product ID to update a product
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    ProductController.updateProduct // Call the updateProduct method from the ProductController to handle the request
  ) // Define a PUT request to update a product
  .delete(
    "/:productId", // Define the route path with a parameter for the product ID to delete a product
    authMiddleware.authenticated, // Apply authentication middleware to authenticate the user
    ProductController.deleteProduct // Call the deleteProduct method from the ProductController to handle the request
  ); // Define a DELETE request to delete a product

// Exporting the router instance
export default router; // Export the router instance
