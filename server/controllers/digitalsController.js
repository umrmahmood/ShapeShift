import Digitals from "../models/schemaFiles/digitalsSchema.js";
import { v2 as cloudinary } from "cloudinary";

const DigitalsController = {
  createDigitalProduct: async (req, res) => {
    try {
      if (!req.user.firebaseId) {
        return res.status(403).json({
          message: "User does not have permission to create a request.",
        });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "raw",
        fetch_format: "glb",
        use_filename: true,
        unique_filename: false,
        tags: req.file.originalname,
      });

      const {
        name,
        description,
        material,
        color,
        resolution,
        resistanz,
        tags,
        quantity,
      } = req.body;

      const newDigitalProduct = new Digitals({
        name,
        description,
        inquiryFile: result.url,
        cloudFileId: result.asset_id,
        inquiryUser: req.user._id,
        material,
        color,
        resolution,
        resistanz,
        tags,
        quantity,
      });

      const savedDigitalProduct = await newDigitalProduct.save();
      return res.status(201).json(savedDigitalProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllDigitalProducts: async (req, res) => {
    try {
      const digitals = await Digitals.find();
      res.status(200).json(digitals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDigitalProductById: async (req, res) => {
    const digitalId = req.params.digitalId;
    try {
      const digital = await Digitals.findById(digitalId);
      if (!digital) {
        return res.status(404).json({ message: "Digital product not found" });
      }
      res.status(200).json(digital);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateDigitalProduct: async (req, res) => {
    const digitalId = req.params.digitalId;
    const updateData = req.body;
    try {
      const existingDigital = await Digitals.findById(digitalId);
      if (!existingDigital) {
        return res.status(404).json({ message: "Digital product not found" });
      }

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

  deleteDigitalProduct: async (req, res) => {
    const digitalId = req.params.digitalId;
    try {
      const digital = await Digitals.findById(digitalId);
      if (!digital) {
        return res.status(404).json({ message: "Digital product not found" });
      }

      await cloudinary.uploader.destroy(digital.cloudFileId, {
        resource_type: "raw",
      });

      await Digitals.findByIdAndDelete(digitalId);

      res.status(200).json({ message: "Digital product deleted", digitalId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default DigitalsController;
