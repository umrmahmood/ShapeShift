// Route file for defining digital product-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import DigitalsController from "../controllers/digitalsController.js"; // Import the DigitalsController for handling digital product-related logic
import Parser3D from "../config/multer3D.js"; // Import the Multer configuration for handling file uploads
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authentication middleware

// Creating an instance of Express router
const router = express.Router(); // Create a new router instance

// Route for fetching all digital products and by ID
router
  .get("/", DigitalsController.getAllDigitalProducts) // Define a GET request to fetch all digital products
  .get("/:digitalId", DigitalsController.getDigitalProductById); // Define a GET request to fetch a specific digital product by ID

// Routes for creating, updating, and deleting digital products
router
  .post(
    "/create", // Define the route path for creating a new digital product
    authMiddleware.authenticated,
    Parser3D.single("file"), // Use Multer middleware to parse multipart form data with file field name "file"
    DigitalsController.createDigitalProduct // Call the createDigitalProduct method from the DigitalsController to handle the request
  ) // Define a POST request to create a new digital product
  .put(
    "/:digitalId", // Define the route path with a parameter for the digital product ID to update a digital product
    DigitalsController.updateDigitalProduct // Call the updateDigitalProduct method from the DigitalsController to handle the request
  ) // Define a PUT request to update a digital product
  .delete(
    "/:digitalId", // Define the route path with a parameter for the digital product ID to delete a digital product
    DigitalsController.deleteDigitalProduct // Call the deleteDigitalProduct method from the DigitalsController to handle the request
  ); // Define a DELETE request to delete a digital product

// Exporting the router instance
export default router; // Export the router instance
