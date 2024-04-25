// Controller file for handling product-related logic.

//  Importing necessary dependencies
import Product from "../models/schemaFiles/productSchema.js";
import { ProductImages } from "../models/schemaFiles/imagesSchema.js";
import { v2 as cloudinary } from "cloudinary";

const ProductController = {
  // Method to create a new product
  createProduct: async (req, res) => {
    try {
      if (!req.user.membership?.haveShop) {
        return res.status(403).json({
          message:
            "User does not have permission to create products. Open a shop first.",
        });
      }

      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const productImagesIds = [];

      for (const file of req.files) {
        const searchResult = await cloudinary.search
          .expression(`filename:${file.originalname}`)
          .execute();

        if (searchResult.total_count > 0) {
          // Image exists on Cloudinary
          const imageUrl = searchResult.resources[0].secure_url;

          // Check if the image exists in your database with the exact URL
          const existingImage = await ProductImages.findOne({ url: imageUrl });

          if (existingImage) {
            // Use the existing image's _id
            productImagesIds.push(existingImage._id);
          } else {
            // Image exists on Cloudinary but not in the database
            console.log("Image exists on Cloudinary but not in the database");

            // Upload a new image to Cloudinary
            const result = await cloudinary.uploader.upload(file.path);

            // Create a new image in the database with the exact Cloudinary URL
            const newProductImage = await ProductImages.create({
              url: imageUrl, // Use the exact URL from Cloudinary search result
              productId: null,
            });
            productImagesIds.push(newProductImage._id);
          }
        } else {
          // Image does not exist on Cloudinary, so upload it
          const result = await cloudinary.uploader.upload(file.path);
          const productImage = await ProductImages.create({
            url: result.secure_url,
            productId: null,
          });
          productImagesIds.push(productImage._id);
        }
      }

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

      const newProduct = new Product({
        name,
        description,
        category,
        price,
        currency,
        images: productImagesIds,
        seller: req.user._id,
        type,
        material,
        dimensions,
        tags,
      });

      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
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

    try {
      if (!req.user.membership?.haveShop) {
        return res.status(403).json({
          message:
            "User does not have permission to create products. Open a shop first.",
        });
      }

      if (req.files && Array.isArray(req.files)) {
        const imageUrls = await Promise.all(
          req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
          })
        );

        const productImagesIds = [];

        for (const url of imageUrls) {
          const productImage = await ProductImages.create({
            url,
            productId: null,
          });
          productImagesIds.push(productImage._id);
        }

        updateData.images = productImagesIds;
      }

      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
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
