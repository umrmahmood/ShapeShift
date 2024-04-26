// Route file for defining product-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ProductController from "../controllers/productController.js";
import UpdateImageController from "../controllers/imageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import Parser from "../config/multerConfig.js";

// Creating an instance of Express router
const router = express.Router();

// Route for fetching all products and by ID
router
  .get("/", ProductController.getAllProducts) // GET request to fetch all products
  .get("/:productId", ProductController.getProductById); // GET request to fetch a specific product by ID

// Routes for creating, updating, and deleting products
router
  // Apply authenticated middleware only to the routes below
  .post(
    "/",
    authMiddleware.authenticated,
    Parser.array("images", 5),
    ProductController.createProduct
  ) // POST request to create a new product
  .put(
    "/:productId",
    authMiddleware.authenticated,
    Parser.array("images", 5),
    ProductController.updateProduct
  ) // PUT request to update a product
  .post(
    "/products/:productId/images/:imageIndex",
    authMiddleware.authenticated,
    Parser.array("images", 5),
    UpdateImageController.updateImage
  )
  .delete(
    "/:productId",
    authMiddleware.authenticated,
    ProductController.deleteProduct
  ); // DELETE request to delete a product

// Exporting the router instance
export default router;
