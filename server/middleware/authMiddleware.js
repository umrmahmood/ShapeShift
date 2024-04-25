// Middleware file for handling authentication.

//  Importing necessary dependencies
import jwt from "jsonwebtoken";
import User from "../models/schemaFiles/userSchema.js";
import path, { join } from "path"; // Importing path module for file path manipulation
import { decode } from "punycode";
import dotenv from "dotenv";

// Loading environment variables from .env file
dotenv.config(); // Specifying the path to the .env file

// Setting __dirname
const __dirname = path.resolve(); // Resolving the directory name

const authMiddleware = {
  authenticated: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      console.log("Received token:", token);
      if (!token) {
        console.log("No token provided");
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }
      // console.log("JWT TOKEN :", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token:", decoded);
      if (!decoded) {
        console.log("Invalid token");
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      const user = await User.findById(decoded.id);
      // console.log("Found user:", user);
      if (!user) {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      }

      req.user = { ...user.toObject() };
      console.log("Authenticated user:", req.user);
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authMiddleware;
