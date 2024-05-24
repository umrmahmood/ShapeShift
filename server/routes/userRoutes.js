// userRoutes.js

// Importing dependencies
import express from "express"; // Importing the Express framework to create router

// Importing controllers
import UserController from "../controllers/userController.js"; // Importing UserController to handle user-related operations

const router = express.Router(); // Creating a new router object

router.get("/firebase/:id", UserController.getUserByFirebaseId);

// User registration route
router.post("/register", UserController.register);
// Route for user registration, which calls the register method from UserController

// User login route
router.post("/login", UserController.login);
// Route for user login, which calls the login method from UserController

// Firebase login route
router.post("/firelogin", UserController.fireLogin);
// Route for Firebase user login, which calls the fireLogin method from UserController

// Get user profile
router.get("/profile/:id", UserController.getProfileById);
// Route for getting a user's profile by their ID, which calls the getProfileById method from UserController

// User profile updating route
router.put("/profile/:id", UserController.updateProfile);
// Route for updating a user's profile by their ID, which calls the updateProfile method from UserController

// User logout route
router.post("/logout", UserController.logout);
// Route for user logout, which calls the logout method from UserController

// Change user password route
router.put("/password/:userId", UserController.changePassword);
// Route for changing a user's password by their user ID, which calls the changePassword method from UserController

export default router; // Exporting the router object to be used in other parts of the application
