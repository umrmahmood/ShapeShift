// Controller file for handling product-related logic.

// Importing necessary dependencies
import Product from "../models/schemaFiles/productSchema.js";
import { v2 as cloudinary } from "cloudinary";

const ProductController = {
  // Method to create a new product
  createProduct: async (req, res) => {
    try {
      // Check if the user has permission to create products
      if (!req.user.membership?.haveShop) {
        return res.status(403).json({
          message:
            "User does not have permission to create products. Open a shop first.",
        });
      }

      // Check if files were uploaded
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Array to store product images data
      const productImages = [];

      // Loop through each uploaded file
      for (const file of req.files) {
        // Upload file to Cloudinary
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

        // Filtered result containing selected keys
        const filteredResult = {
          public_id: result.public_id,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          tags: result.tags,
          url: result.url,
          created_at: result.created_at,
        };

        // Push filtered result to productImages array
        productImages.push(filteredResult);
      }

      // Destructure request body
      const {
        name,
        description,
        category,
        price,
        currency,
        type,
        material,
        dimensions,
        tags,
      } = req.body;

      // Create a new product instance
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        currency,
        images: productImages,
        seller: req.user._id,
        type,
        material,
        dimensions,
        tags,
      });

      // Save the new product
      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch all products
  getAllProducts: async (req, res) => {
    try {
      // Find all products
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to fetch a product by ID
  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      // Find product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Product not found" });
    }
  },

  // Method to update a product
  updateProduct: async (req, res) => {
    const productId = req.params.productId;
    const updateData = req.body;

    try {
      // Check if the user has permission to update products
      if (!req.user.membership?.haveShop) {
        return res.status(403).json({
          message:
            "User does not have permission to update products. Open a shop first.",
        });
      }

      // Update product data
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update only non-empty fields
      for (const [key, value] of Object.entries(updateData)) {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          existingProduct[key] !== value
        ) {
          existingProduct[key] = value;
        }
      }

      const updatedProduct = await existingProduct.save();
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to delete a product
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      // Find and delete product by ID
      const deleteProduct = await Product.findByIdAndDelete(productId);

      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(deleteProduct);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default ProductController;
