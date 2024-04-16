// Route file for defining admin-related endpoints.
// Importing dependencies
import express from "express";

// Importing controllers
import AdminController from "../controllers/adminController.js"; // Importing the AdminController to handle admin-related actions
import authMiddleware from "../middleware/authMiddleware.js"; // Importing the authMiddleware to ensure routes are only accessible to admin users

const router = express.Router(); // Creating an Express router instance

// Middleware to ensure routes are only accessible to admin users
router.use(authMiddleware.isAdmin);

// Route for managing users
router
  .get("/users", AdminController.getAllUsers) // GET route to fetch all users
  .get("/users/:userId", AdminController.getUserById) // GET route to fetch a specific user by ID
  .put("/users/:userId", AdminController.updateUser) // PUT route to update a specific user by ID
  .delete("/users/:userId", AdminController.deleteUser); // DELETE route to delete a specific user by ID

// Route for managing products
router
  .get("/listings", AdminController.getAllProducts) // GET route to fetch all products
  .get("/listings/:productId", AdminController.getProductById) // GET route to fetch a specific product by ID
  .post("/listings", AdminController.createProduct) // POST route to create a new product
  .put("/listings/:productId", AdminController.updateProduct) // PUT route to update a specific product by ID
  .delete("/listings/:productId", AdminController.deleteProduct); // DELETE route to delete a specific product by ID

// Route for managing orders
router
  .get("/orders", AdminController.getAllOrders) // GET route to fetch all orders
  .get("/orders/:orderId", AdminController.getOrderById) // GET route to fetch a specific order by ID
  .put("/orders/:orderId", AdminController.updateOrderStatus) // PUT route to update the status of a specific order by ID
  .delete("/orders/:orderId", AdminController.deleteOrder); // DELETE route to delete a specific order by ID

// Add more routes as needed for managing other resources
// Example: categories, payments, etc.

export default router; // Exporting the router for use in other parts of the application
