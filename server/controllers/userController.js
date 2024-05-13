// Controller file for handling user-related logic.

//  Importing necessary dependencies
import User from "../models/schemaFiles/userSchema.js"; // Importing the user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation and verification
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing and comparison
import dotenv from "dotenv"; // Importing dotenv for environment variables
import path, { join } from "path"; // Importing path module for file path manipulation
import { ProfileImage } from "../models/schemaFiles/imagesSchema.js"; // Import the ProductImages model for interacting with image data
import { v2 as cloudinary } from "cloudinary"; // Import the Cloudinary library for image upload

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
        shopId: user.membership.shopId,
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

  // Firebase Login controller
  fireLogin: async (req, res) => {
    const { email, googleUserId, githubUserId, ...otherData } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        // If the user doesn't exist, create a new user
        const newUser = new User({
          email,
          googleUid: googleUserId,
          githubUid: githubUserId,
          ...otherData,
        });
        user = await newUser.save();
      }

      // Generate JWT token with user data
      const payload = {
        id: user._id,
        role: user.membership.role,
        membership: user.membership,
        shopId: user.membership.shopId,
      };
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

  // Add Profile Image
  uploadProfileImage: async (req, res) => {
    try {
      const userId = req.params.userId;
      const file = req.file; // Get the uploaded file from the request

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Fetch the user document by its ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user already has a profile image
      if (user.profile.avatar) {
        // Find the existing profile image in the database
        const existingProfileImage = await ProfileImage.findById(
          user.profile.avatar
        );

        if (existingProfileImage) {
          // Delete the existing profile image from Cloudinary
          await cloudinary.uploader.destroy(existingProfileImage.public_id);

          // Upload the new file to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            use_filename: true,
            tags: file.originalname,
            unique_filename: false,
            transformation: [
              { width: 1000, crop: "scale" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });

          // Update the existing profile image with the new information
          Object.assign(existingProfileImage, {
            public_id: result.public_id,
            version_id: result.version_id,
            signature: result.signature,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            tags: result.tags,
            url: result.url,
          });

          // Save the updated profile image
          await existingProfileImage.save();
        }
      } else {
        // If the user doesn't have a profile image, create a new one
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { width: 1000, crop: "scale" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

        // Create a new profile image object and associate it with the user
        const newProfileImage = await ProfileImage.create({
          public_id: result.public_id,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          tags: result.tags,
          url: result.url,
          userId: userId, // Associate the image with the user
        });

        // Update the user's profile avatar
        user.profile.avatar = newProfileImage._id;

        // Save the updated user
        await user.save();
      }

      return res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default UserController;
