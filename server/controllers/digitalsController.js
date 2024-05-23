// Controller file for handling digital product-related logic.

// Importing necessary dependencies
import Digitals from "../models/schemaFiles/digitalsSchema.js";
import { v2 as cloudinary } from "cloudinary";

const DigitalsController = {
  // Method to create a new digital product
  createDigitalProduct: async (req, res) => {
    try {
      if (!req.user.id) {
        return res.status(403).json({
          message: "User does not have permission to create a request.",
        });
      }
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload 3D file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw", // To handle non-image files
        use_filename: true,
        unique_filename: false,
        tags: req.file.originalname,
      });

      // Destructure request body
      const {
        name,
        description,
        material,
        color,
        resolution,
        resistanz,
        tags,
        quantity,
        asker,
      } = req.body;

      // Create a new digital product instance
      const newDigitalProduct = new Digitals({
        name,
        description,
        file: result.url, // Store the URL of the uploaded file
        cloudFileId: result.public_id,
        asker: req.user.id,
        material,
        color,
        resolution,
        resistanz,
        tags,
        quantity,
      });

      // Save the new digital product
      const savedDigitalProduct = await newDigitalProduct.save();

      return res.status(201).json(savedDigitalProduct);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch all digital products
  getAllDigitalProducts: async (req, res) => {
    try {
      // Find all digital products
      const digitals = await Digitals.find();
      res.status(200).json(digitals);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch a digital product by ID
  getDigitalProductById: async (req, res) => {
    const digitalId = req.params.digitalId;

    try {
      // Find digital product by ID
      const digital = await Digitals.findById(digitalId);
      if (!digital) {
        return res.status(404).json({ message: "Digital product not found" });
      }
      res.status(200).json(digital);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to update a digital product
  updateDigitalProduct: async (req, res) => {
    const digitalId = req.params.digitalId;
    const updateData = req.body;

    try {
      // Update digital product data
      const existingDigital = await Digitals.findById(digitalId);
      if (!existingDigital) {
        return res.status(404).json({ message: "Digital product not found" });
      }

      // Update only non-empty fields
      for (const [key, value] of Object.entries(updateData)) {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          existingDigital[key] !== value
        ) {
          existingDigital[key] = value;
        }
      }

      const updatedDigital = await existingDigital.save();
      return res.status(200).json(updatedDigital);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to delete a digital product
  deleteDigitalProduct: async (req, res) => {
    const digitalId = req.params.digitalId;
    try {
      // Find and delete digital product by ID
      const digital = await Digitals.findById(digitalId);
      if (!digital) {
        return res.status(404).json({ message: "Digital product not found" });
      }

      // Delete file from Cloudinary
      await cloudinary.uploader.destroy(digital.cloudFileId, {
        resource_type: "raw",
      });

      // Delete digital product from database
      await Digitals.findByIdAndDelete(digitalId);

      res.status(200).json({ message: "Digital product deleted", digitalId });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default DigitalsController;
