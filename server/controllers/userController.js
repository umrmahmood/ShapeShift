// userController.js

// Controller file for handling user-related logic.

//  Importing necessary dependencies
import User from "../models/schemaFiles/userSchema.js"; // Importing the user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation and verification
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing and comparison
import dotenv from "dotenv"; // Importing dotenv for environment variables
import path, { join } from "path"; // Importing path module for file path manipulation
import { ProfileImage } from "../models/schemaFiles/imagesSchema.js"; // Import the ProductImages model for interacting with image data
import { v2 as cloudinary } from "cloudinary"; // Import the Cloudinary library for image upload
import { admin } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";

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

      // Create new user in MongoDB
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      // Create corresponding user in Firebase Admin
      const firebaseUserInfo = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
      });
      const firebaseId = firebaseUserInfo.uid;

      savedUser.firebaseId = firebaseId;
      await savedUser.save();

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
      // Step 1: Verify user's credentials with MongoDB
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Step 2: Create Firebase user if firebaseId is missing
      if (!user.firebaseId) {
        try {
          const firebaseUserInfo = await getAuth().createUser({
            email: user.email,
            password: password, // Use the same password
          });
          user.firebaseId = firebaseUserInfo.uid;
          await user.save();
        } catch (firebaseError) {
          console.error("Error creating Firebase user:", firebaseError);
          return res
            .status(500)
            .json({ message: "Error creating Firebase user" });
        }
      }

      // Step 3: Authenticate with Firebase
      let firebaseToken;
      try {
        const firebaseUser = await getAuth().getUser(user.firebaseId);
        firebaseToken = await getAuth().createCustomToken(firebaseUser.uid);
      } catch (firebaseError) {
        console.error("Error authenticating with Firebase:", firebaseError);
        return res
          .status(500)
          .json({ message: "Firebase authentication failed" });
      }

      // Create payload for JWT token
      const payload = {
        id: user._id,
        role: user.membership.role,
        membership: user.membership,
        shopId: user.membership.shopId,
        firebaseId: user.firebaseId,
      };

      // Generate JWT token with payload
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      // Send both tokens in response
      res.status(200).json({ token, firebaseToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Firebase Login controller
  fireLogin: async (req, res) => {
    const { email, uid, ...otherData } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        // If the user doesn't exist, create a new user
        const newUser = new User({
          email,
          firebaseId: uid,
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
        firebaseId: user.firebaseId,
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

  getUserByFirebaseId: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);

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

      // Find the existing profile image in the database
      const existingProfileImage = user.profile.avatar;

      if (existingProfileImage) {
        if (existingProfileImage === "66448d9c21f44c996153d41e") {
          const newProfileImage = new ProfileImage();

          // Upload the new file to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            use_filename: true,
            tags: file.originalname,
            unique_filename: false,
            transformation: [
              { gravity: "auto", height: 1000, width: 1000, crop: "fill" },
              { effect: "sharpen" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });

          // Populate the new profile image object with information from Cloudinary
          newProfileImage.public_id = result.public_id;
          newProfileImage.version_id = result.version_id;
          newProfileImage.signature = result.signature;
          newProfileImage.width = result.width;
          newProfileImage.height = result.height;
          newProfileImage.format = result.format;
          newProfileImage.resource_type = result.resource_type;
          newProfileImage.tags = result.tags;
          newProfileImage.url = result.url;

          // Save the new profile image
          await newProfileImage.save();

          // Update the user's profile avatar
          user.profile.avatar = newProfileImage._id;
          user.profile.avatarUrl = newProfileImage.url;
          await user.save();
        } else {
          const oldProfileImage = await ProfileImage.findById(
            existingProfileImage
          );
          // Delete the existing profile image from Cloudinary
          await cloudinary.uploader.destroy(oldProfileImage.public_id);

          // Upload the new file to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            use_filename: true,
            tags: file.originalname,
            unique_filename: false,
            transformation: [
              { gravity: "auto", height: 1000, width: 1000, crop: "fill" },
              { effect: "sharpen" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          });

          // Update the existing profile image with the new information
          Object.assign(oldProfileImage, {
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
          await oldProfileImage.save();
          // Update the user's profile avatar
          user.profile.avatarUrl = oldProfileImage.url;

          // Save the updated user
          await user.save();
        }
      }

      return res.status(201).json({
        message: "Image uploaded successfully",
        avatarUrl: user.profile.avatarUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getProfileImage: async (req, res) => {},

  //Change Password
  changePassword: async (req, res) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
      // Find the user by userId
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify the current password
      const isPasswordValid = await bcryptjs.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      // Hash the new password
      const hashedPassword = await bcryptjs.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Return success response
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default UserController;
