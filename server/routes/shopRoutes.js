// Route file for defining shop-related endpoints.

// Importing dependencies
import express from "express";

// Importing controllers
import ShopController from "../controllers/shopController.js"; // Importing the ShopController to handle shop-related logic
import authMiddleware from "../middleware/authMiddleware.js"; // Importing authMiddleware for authentication

// Creating an instance of Express router
const router = express.Router(); // Creating a router instance using Express

// Protected routes requiring authentication
router.use(authMiddleware.authenticated); // Applying the authMiddleware to protect routes from unauthorized access

// Routes for managing shop information
router.post("/register", ShopController.register);
//   .get("/:shopId", ShopController.getShopInfo) // GET route to fetch shop information
//   .post("/register", ShopController.register) // POST route to create a new shop
//   .put("/:shopId", ShopController.updateShop); // PUT route to update shop information

// // Routes for managing shop listings (products)
// router
//   .get("/:shopId/listings", ShopController.getShopProducts) // GET route to fetch products listed in the shop
//   .post("/:shopId/list", ShopController.addProductToShop) // POST route to add a product to the shop
//   .delete("/:shopId/listings/:productId", ShopController.removeProductFromShop); // DELETE route to remove a product from the shop

//

// Additional routes for managing shop categories, settings, reviews, orders, promotions, analytics, etc.

export default router; // Exporting the router for use in other files
