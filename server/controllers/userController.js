// Controller file for handling user-related logic.

//  Importing necessary dependencies
import User from "../models/schemaFiles/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path, { join } from "path"; // Importing path module for file path manipulation

// Loading environment variables from .env file
dotenv.config({ path: "../config/.env" }); // Specifying the path to the .env file

// Setting __dirname
const __dirname = path.resolve(); // Resolving the directory name

// Define controller methods
const UserController = {
  // Register controller
  register: async (req, res) => {
    try {
      const userData = req.body;

      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This email is already registered" });
      }
      const newUser = new User(userData);

      const savedUser = await newUser.save();

      res
        .status(201)
        .json({ message: "You registered successfully", user: savedUser });
    } catch (error) {
      console.error("Error registering this user", error);
      res
        .status(500)
        .json({ message: "An error occurred while registering user" });
    }
  },

  // Login controller
  login: async (req, res) => {},

  // Get user profile
  getProfileById: async (req, res) => {},

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const updateProfile = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, updateProfile, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user profile" });
    }
  },

  // Logout user
  logout: async (req, res) => {},
};

export default UserController;
