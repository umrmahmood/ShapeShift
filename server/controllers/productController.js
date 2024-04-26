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

      const existingImageUrls = [];

      for (const file of req.files) {
        const nameWithDashes = file.originalname.replace(/\s+/g, "-");

        const searchResult = await cloudinary.search
          .expression(`tags:${nameWithDashes}`)
          .execute();

        if (searchResult.resources.length > 0) {
          // File with the same tag already exists on Cloudinary
          console.log(
            `File with tag '${nameWithDashes}' already exists on Cloudinary.`
          );
          // Collect the URLs of the found images
          existingImageUrls.push(searchResult.resources[0].secure_url); // Assuming you want to use the URL of the first found image
        } else {
          // File with the same tag doesn't exist on Cloudinary, proceed with uploading
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

          const newProductImage = await ProductImages.create({
            url: result.secure_url,
            productId: null,
          });
          productImagesIds.push(newProductImage._id);
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

      // Create the product using existing image URLs if any
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        currency,
        images:
          existingImageUrls.length > 0 ? existingImageUrls : productImagesIds,
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
    //   const productId = req.params.productId;
    //   const updateData = req.body;
    //   try {
    //     if (!req.user.membership?.haveShop) {
    //       return res.status(403).json({
    //         message:
    //           "User does not have permission to create products. Open a shop first.",
    //       });
    //     }
    //     if (req.files && Array.isArray(req.files)) {
    //       const imageUrls = await Promise.all(
    //         req.files.map(async (file) => {
    //           const result = await cloudinary.uploader.upload(file.path);
    //           return result.secure_url;
    //         })
    //       );
    //       const productImagesIds = [];
    //       for (const url of imageUrls) {
    //         const productImage = await ProductImages.create({
    //           url,
    //           productId: null,
    //         });
    //         productImagesIds.push(productImage._id);
    //       }
    //       updateData.images = productImagesIds;
    //     }
    //     const existingProduct = await Product.findById(productId);
    //     if (!existingProduct) {
    //       return res.status(404).json({ message: "Product not found" });
    //     }
    //     const updatedProduct = await Product.findByIdAndUpdate(
    //       productId,
    //       updateData,
    //       { new: true }
    //     );
    //     if (!updatedProduct) {
    //       return res.status(404).json({ message: "Product not found" });
    //     }
    //     return res.status(200).json(updatedProduct);
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: "Internal server error" });
    //   }
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
