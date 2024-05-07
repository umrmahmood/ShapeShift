//  ShopSchema file

// Importing dependencies
import mongoose, { Schema } from "mongoose"; // Importing mongoose and Schema from mongoose package.

// Defining the shop schema using the Schema constructor.
const ShopSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the shop, required and must be unique.
    owner: { type: String, unique: true }, // Reference to the owner (user), required.
    avatar: { type: String },
    banner: { type: String },
    description: {
      type: String,
      maxlength: [300, "Description cannot exceed 300 characters"], // Description of the shop with character limit.
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }], // Array of category references.
    products: [{ type: String }], // Array of product references.
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the user who rated the shop.
        rating: { type: Number, min: 1, max: 5 }, // Rating given by the user (1 to 5).
      },
    ],
    location: { type: String, required: true }, // Location of the shop, required.
    taxId: String, // Tax identification number for taxation purposes.
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
  { timestamps: true }
);

// Creating the Shop model using the schema.
const Shop = mongoose.model("Shop", ShopSchema);

export default Shop; // Exporting the Shop model.
