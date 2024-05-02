// Controller file for handling user-related logic.

//  Importing necessary dependencies
import User from "../models/schemaFiles/userSchema.js"; // Importing the user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation and verification
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing and comparison
import dotenv from "dotenv"; // Importing dotenv for environment variables
import path, { join } from "path"; // Importing path module for file path manipulation

// Loading environment variables from .env file
dotenv.config({ path: "./config/.env" }); // Specifying the path to the .env file

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
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create payload for JWT token
      const payload = {
        id: user._id,
        role: user.membership.role,
        membership: user.membership,
      };
      console.log("payload:", payload);

      // Generate JWT token with payload
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      // Send token in response
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get user profile by ID
  getProfileById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Send user profile in response
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the user profile" });
    }
  },

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

      // Send updated user profile in response
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
  logout: async (req, res) => {
    try {
      localStorage.removeItem("shapeshiftkey");

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout", error);
      res.status(500).json({ message: "An error occurred during logout" });
    }
  },
};

export default UserController;
