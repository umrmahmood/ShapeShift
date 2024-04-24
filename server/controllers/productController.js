// Controller file for handling product-related logic.

//  Importing necessary dependencies
import Product from "../models/schemaFiles/productSchema.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" }); // Specifying the path to the .env file
import path, { join } from "path"; // Importing path module for file path manipulation

dotenv.config({ path: "../config/.env" }); // Specifying the path to the .env file

const __dirname = path.resolve(); // Resolving the directory name

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Loading environment variables from .env file
//dotenv.config({ path: "../config/.env" }); // Specifying the path to the .env file

// Setting __dirname
//const __dirname = path.resolve(); // Resolving the directory name

// Define controller methods

const ProductController = {
  // Method to create a new product
  createProduct: async (req, res) => {
    try {
      console.log(req.body);

      if (req.files && Array.isArray(req.files)) {
        // Map over each file and upload to Cloudinary
        const imageUrls = await Promise.all(
          req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
          })
        );
        // Add imageUrls to the new product
        req.body.images = imageUrls;
      } else {
        // If no files uploaded, set images field to an empty array
        req.body.images = [];
      }

      console.log("Received create product request:", req.body);
      console.log("User:", req.user);
      if (!req.user.membership?.haveShop) {
        console.log("User does not have permission to create products");
        return res.status(403).json({
          message:
            "User does not have permission to create products. Open a shop first.",
        });
      }
      const {
        name,
        description,
        category,
        price,
        currency,
        images,
        type,
        material,
        dimensions,
        tags,
      } = req.body;

      const newProduct = new Product({
        name,
        description,
        category,
        price,
        currency,
        images,
        seller: req.user._id,
        type,
        material,
        dimensions,
        tags,
      });
      console.log("New product object:", newProduct);
      const savedProduct = await newProduct.save();
      console.log("Saved product:", savedProduct);
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch a product by ID
  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Product not found" });
    }
  },

  // Method to update a product
  updateProduct: async (req, res) => {
    const productId = req.params.productId;
    const updateData = req.body;
    console.log("req: +++", req);
    try {
      if (!req.user.membership?.haveShop) {
        console.log("User does not have permission to create products");
        return res.status(403).json({
          message:
            "User does not have permission to create products. Open a shop first.",
        });
      }
      // Check if files were uploaded
      if (req.files && Array.isArray(req.files)) {
        // Map over each file and upload to Cloudinary
        const imageUrls = await Promise.all(
          req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
          })
        );
        // Add imageUrls to the updateData
        updateData.images = imageUrls;
      }

      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        console.log("Product not found with ID:", productId);
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to delete a product
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const deleteProduct = await Product.findByIdAndDelete(productId);

      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(deleteProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default ProductController;
