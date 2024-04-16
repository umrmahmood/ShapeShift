// Route file for defining product-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ProductController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// Creating an instance of Express router
const router = express.Router();

// Route for fetching all products and by ID
router
  .get("/listings", ProductController.getAllProducts) // GET request to fetch all products
  .get("/listings/:productId", ProductController.getProductById); // GET request to fetch a specific product by ID

// Routes for creating, updating, and deleting products
router
  // Apply isLoggedIn middleware only to the routes below
  .post("/listings", authMiddleware.isLoggedIn, ProductController.createProduct) // POST request to create a new product
  .put(
    "/listings/:productId",
    authMiddleware.isLoggedIn,
    ProductController.updateProduct
  ) // PUT request to update a product
  .delete(
    "/listings/:productId",
    authMiddleware.isLoggedIn,
    ProductController.deleteProduct
  ); // DELETE request to delete a product

// Exporting the router instance
export default router;
