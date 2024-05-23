//  ProductSchema file

// Importing dependencies
import mongoose, { Schema } from "mongoose";
import { type } from "os";

// Defining the Product Schema
const DigitalsSchema = new Schema(
  {
    // Product name, required field
    name: { type: String, required: true },

    // Product description, optional with a maximum length of 500 characters
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // Category reference for the product
    // category: { type: Schema.Types.ObjectId, ref: "Category" },

    // Price of the product, required and must be a non-negative number

    // Currency of the price, defaults to USD and must be one of the provided options

    // Images of the product, stored as an array of strings (URLs)
    file: { type: String },
    cloudFileId: { type: String },
    // Seller reference for the product, required
    asker: { type: String },

    // Quantity of the product available, defaults to 0
    quantity: { type: Number, default: 0 },

    // Type of the product, either digital or physical

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
    color: {
      type: String,
      enum: [
        "black",
        "red",
        "white",
        "yellow",
        "blue",
        "green",
        "orange",
        "purple",
        "silver",
        "violet",
      ],
    },

    resolution: {
      type: String,
      enum: ["detailed", "medium", "draft"],
    },
    resistanz: {
      type: String,
      enum: ["20%", "60%", "80%"],
    },

    // Tags associated with the product, stored as an array of strings
    tags: [{ type: String }],

    // Timestamps for when the product was created and last updated
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: {
      // Membership activation status.
      status: {
        type: Boolean, // Data type for active field.
        default: true, // Default value for active field.
      },
      lastActiveAt: {
        type: Date, // Data type for storing the last active timestamp.
        default: Date.now, // Default value for last active timestamp (current time).
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Update updatedAt field before saving the document
DigitalsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Creating the Product model from the ProductSchema
const Digitals = mongoose.model("Digitals", DigitalsSchema);

export default Digitals;
