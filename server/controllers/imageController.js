// Import necessary dependencies
import Product from "../models/schemaFiles/productSchema.js";
import { v2 as cloudinary } from "cloudinary";

const UpdateImageController = {
  updateImage: async (req, res) => {
    // Extract relevant data from the request
    const { productId, imageIndex } = req.params;
    const file = req.file;

    try {
      // Check if file exists
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload the updated image to Cloudinary
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

      // Find the product and update the image URL at the specified index
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the image index is valid
      if (imageIndex < 0 || imageIndex >= product.images.length) {
        return res.status(400).json({ message: "Invalid image index" });
      }

      // Update the image URL at the specified index
      const updatedImage = {
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

      product.images[imageIndex] = updatedImage;

      // Save the updated product
      await product.validate({ validateModifiedOnly: true }); // This ignores the `name` field
      const updatedProduct = await product.save();

      // Return the updated product
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default UpdateImageController;
