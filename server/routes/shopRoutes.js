// Route file for defining shop-related endpoints.

// Importing dependencies
import express from "express"; // Importing Express framework

// Importing controllers
import ShopController from "../controllers/shopController.js"; // Importing the ShopController to handle shop-related logic
import authMiddleware from "../middleware/authMiddleware.js"; // Importing authMiddleware for authentication

// Creating an instance of Express router
const router = express.Router(); // Creating a router instance using Express

// Routes for managing shop information
router
  .post("/register", authMiddleware.authenticated, ShopController.register)
  // POST route to register a new shop, requires authentication via authMiddleware

  .get("/:shopId", ShopController.getShopInfo)
  // GET route to fetch shop information based on the shopId parameter

  .put("/:shopId", ShopController.updateShop);
// PUT route to update shop information based on the shopId parameter

export default router; // Exporting the router for use in other files
