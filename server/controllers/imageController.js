// Controller file for handling image-related logic.

// Importing necessary dependencies
import { ProductImages } from "../models/schemaFiles/imagesSchema.js"; // Import the ProductImages model for interacting with image data
import { ShopImage, ShopBanner } from "../models/schemaFiles/imagesSchema.js";
import Product from "../models/schemaFiles/productSchema.js"; // Import the Product model for interacting with product data
import { v2 as cloudinary } from "cloudinary"; // Import the Cloudinary library for image upload

// Product Images
const ImageController = {
  // Method to fetch a Image Info by ID
  getProductImageById: async (req, res) => {
    const imageId = req.params.imageId;

    try {
      // Find product by ID
      const image = await ProductImages.findById(imageId);

      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(200).json(image);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Image not found" });
    }
  },

  //get shop Avatar
  getShopAvatar: async (req, res) => {
    const shopId = req.params.shopId;

    try {
      // Find shop avatar by shopId
      const image = await ShopImage.findOne({ shopId: shopId });

      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(200).json(image);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //get shop banner
  getShopBanner: async (req, res) => {
    const shopId = req.params.shopId;

    try {
      // Find shop avatar by shopId
      const image = await ShopBanner.findOne({ shopId: shopId });
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(200).json(image);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Method to upload a new Product image
  uploadProductImage: async (req, res) => {
    Product;
    try {
      const productId = req.params.productId; // Extract the product ID from the request parameters

      const files = req.files; // Get the uploaded files from the request
      if (!files) {
        return res.status(400).json({ message: "No file uploaded" }); // Return error if no files were uploaded
      }

      // Fetch the product document by its ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" }); // Return error if the product doesn't exist
      }

      // Check if the total number of images after upload exceeds the limit of 5
      if (product.images.length + req.files.length > 5) {
        return res.status(400).json({ message: "Maximum 5 images allowed" }); // Return error if the image limit is exceeded
      }

      // Loop through each uploaded file
      for (const file of req.files) {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          tags: file.originalname,
          unique_filename: false,
          transformation: [
            { width: 1000, height: 1000, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

        // Create a new image object and associate it with the product
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
          productId: productId, // Associate the image with the product
        });

        // Push the image ID to the product's images array
        await Product.findByIdAndUpdate(
          productId,
          { $push: { images: newProductImage._id } },
          { new: true }
        );
      }

      return res.status(201).json({ message: "Images uploaded successfully" }); // Return success message after uploading images
    } catch (error) {
      console.error(error); // Log any errors that occur during image upload
      return res.status(500).json({ message: "Internal server error" }); // Return error message for internal server error
    }
  },

  // Method to update an Product image
  updateProductImage: async (req, res) => {
    try {
      // Extract relevant data from the request
      const imageId = req.params.imageId; // Extract the image ID from the request parameters
      const file = req.file; // Get the uploaded file from the request

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" }); // Return error if no file was uploaded
      }

      const oldImage = await ProductImages.findById(imageId); // Find the existing image by ID
      if (!oldImage) {
        return res.status(404).json({ message: "Image not found" }); // Return error if the image doesn't exist
      }

      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(oldImage.public_id);

      // Upload the new file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        use_filename: true,
        tags: file.originalname,
        unique_filename: false,
        transformation: [
          { width: 1000, height: 1000, crop: "fill", gravity: "auto" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      // Find the image by ID and update it with the new data
      const updatedImage = await ProductImages.findByIdAndUpdate(
        imageId,
        {
          $set: {
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
          },
        },
        { new: true }
      );

      if (!updatedImage) {
        return res.status(404).json({ message: "Image not found" }); // Return error if the image doesn't exist
      }

      return res.status(200).json(updatedImage); // Return the updated image object
    } catch (error) {
      console.error(error); // Log any errors that occur during image update
      return res.status(500).json({ message: "Internal server error" }); // Return error message for internal server error
    }
  },

  // Method to delete an Product image
  deleteProductImage: async (req, res) => {
    try {
      const imageId = req.params.imageId; // Extract the image ID from the request parameters

      const image = await ProductImages.findById(imageId); // Find the image by ID
      if (!image) {
        return res.status(404).json({ message: "Image not found" }); // Return error if the image doesn't exist
      }

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);

      // Delete the image document from the database
      await ProductImages.findByIdAndDelete(imageId);

      // Remove the image ID from the product's images array
      await Product.findByIdAndUpdate(
        image.productId,
        { $pull: { images: imageId } },
        { new: true }
      );

      return res.status(200).json({ message: "Image deleted successfully" }); // Return success message after deleting the image
    } catch (error) {
      console.error(error); // Log any errors that occur during image deletion
      return res.status(500).json({ message: "Internal server error" }); // Return error message for internal server error
    }
  },
};

export default ImageController; // Export the ImageController object
