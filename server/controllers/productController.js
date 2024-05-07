// Controller file for handling product-related logic.

// Importing necessary dependencies
import Product from "../models/schemaFiles/productSchema.js";
import { ProductImages } from "../models/schemaFiles/imagesSchema.js";
import { v2 as cloudinary } from "cloudinary";
import Shop from "../models/schemaFiles/shopSchema.js";

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
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      // Array to store IDs of the newly created image objects
      const productImagesIds = [];

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
        // Create a new image object and store its ID
        const newProductImage = await ProductImages.create({
          public_id: result.public_id,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          tags: result.tags,
          url: result.url,
          productId: null,
        });
        productImagesIds.push(newProductImage._id);
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
        quantity,
      } = req.body;

      // Create a new product instance with the IDs of the image objects
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        currency,
        images: productImagesIds, // Assign the IDs of the image objects
        seller: req.user.membership.shopId,
        type,
        material,
        dimensions,
        tags,
        quantity,
      });

      // Save the new product
      const savedProduct = await newProduct.save();

      // Update the productId for each image object with the ID of the newly created product
      for (const imageId of productImagesIds) {
        await ProductImages.findByIdAndUpdate(
          imageId,
          { $set: { productId: savedProduct._id } },
          { new: true }
        );
      }

      // Add ID to the Shop
      await Shop.findByIdAndUpdate(
        req.user.membership.shopId,
        { $push: { products: savedProduct._id } },
        { new: true }
      );

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
    const productId = req.params.productId;
    console.log(productId);

    try {
      // Find product by ID
      const product = await Product.findById(productId);
      console.log(product);
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

  // Method to add images to a product
  addImagesToProduct: async (req, res) => {
    try {
      // Extract product ID and image IDs from the request
      const { productId } = req.params;
      const { imageIds } = req.body;

      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Add the image IDs to the product's images array
      product.images.push(...imageIds);

      // Save the updated product
      const updatedProduct = await product.save();

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to delete a product
  deleteProduct: async (req, res) => {
    const productId = req.params.productId;
    try {
      // Find and delete product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Loop through product images
      for (const imageId of product.images) {
        const image = await ProductImages.findById(imageId);
        if (image) {
          // Delete image from Cloudinary
          await cloudinary.uploader.destroy(image.public_id);
          // Delete image from database
          await ProductImages.findByIdAndDelete(imageId);
        }
      }

      // Delete product from database
      const deleteProduct = await Product.findByIdAndDelete(productId);

      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted", productId });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default ProductController;
