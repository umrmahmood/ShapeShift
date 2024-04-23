//  ProductSchema file

// Importing dependencies
import mongoose, { Schema } from "mongoose";

// Defining the Product Schema
const ProductSchema = new Schema(
  {
    // Product name, required field
    name: { type: String, required: true },

    // Product description, optional with a maximum length of 500 characters
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // Category reference for the product
    // category: { type: Schema.Types.ObjectId, ref: "Category" },

    // Price of the product, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },

    // Currency of the price, defaults to USD and must be one of the provided options
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "CNY", "KRW"],
      default: "USD",
    },

    // Images of the product, stored as an array of strings (URLs)
    images: [{ type: String }],

    // Seller reference for the product, required
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Quantity of the product available, defaults to 0
    quantity: { type: Number, default: 0 },

    // Type of the product, either digital or physical
    type: { type: String, enum: ["digital", "physical"] },

    // Material of the product, selected from a predefined list of options
    material: {
      type: String,
      enum: [
        "PLA",
        "ABS",
        "PETG",
        "TPU",
        "TPE",
        "TPC",
        "Nylon",
        "ASA",
        "PVB",
        "HIPS",
        "PVA",
        "PC",
        "PEI",
        "PEEK",
        "PEKK",
        "PVDF",
        "PPSU",
        "Resins",
        "Ceramics",
        "Silicone",
        "Metals",
      ],
    },

    // Dimensions of the product (width, height, depth), each with a value and unit
    dimensions: {
      width: {
        value: { type: Number },
        unit: { type: String, enum: ["cm", "in"] },
      },
      height: {
        value: { type: Number },
        unit: { type: String, enum: ["cm", "in"] },
      },
      depth: {
        value: { type: Number },
        unit: { type: String, enum: ["cm", "in"] },
      },
    },

    // Tags associated with the product, stored as an array of strings
    tags: [{ type: String }],

    // Ratings and reviews given by users for the product
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String },
      },
    ],

    // Reference to the product from which this one was created (if applicable)
    createdFrom: { type: Schema.Types.ObjectId, ref: "Product" },

    // Timestamps for when the product was created and last updated
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Update updatedAt field before saving the document
ProductSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Creating the Product model from the ProductSchema
const Product = mongoose.model("Product", ProductSchema);

export default Product;
