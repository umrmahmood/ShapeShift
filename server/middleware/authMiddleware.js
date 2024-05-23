// Middleware file for handling authentication.

// Importing necessary dependencies
import jwt from "jsonwebtoken"; // Importing JWT for token verification
import User from "../models/schemaFiles/userSchema.js"; // Importing user schema model for database interaction
import path from "path"; // Importing path module for file path manipulation
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file

// Loading environment variables from .env file
dotenv.config(); // Load environment variables from .env file

// Setting __dirname
const __dirname = path.resolve(); // Resolve the directory name of the current module

// Define authentication middleware methods
const authMiddleware = {
  // Middleware to check if the request is authenticated
  authenticated: async (req, res, next) => {
    try {
      // Extract token from the request header
      // Expected format: "Authorization: Bearer <token>"
      const token = req.header("Authorization").split(" ")[1];
      console.log("Received token:", token);

      // Check if token is missing
      if (!token) {
        console.log("No token provided");
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" }); // Respond with 401 Unauthorized if no token
      }

      // Verify the token using the JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Check if token is invalid
      if (!decoded) {
        console.log("Invalid token");
        return res.status(401).json({ message: "Unauthorized: Invalid token" }); // Respond with 401 Unauthorized if token is invalid
      }

      // Find user by ID extracted from the token
      const user = await User.findById(decoded.id);
      console.log("Found user:", user);

      // Check if user is not found
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" }); // Respond with 404 Not Found if user does not exist
      }

      // Attach user object to the request for further use in next middleware/controller
      req.user = { ...user.toObject() };
      console.log("Authenticated user:", req.user);

      // Move to the next middleware/controller
      next();
    } catch (error) {
      // Handle authentication errors
      console.error("Authentication error:", error);
      return res.status(500).json({ message: "Internal server error" }); // Respond with 500 Internal Server Error in case of exceptions
    }
  },
};

export default authMiddleware; // Export authentication middleware
