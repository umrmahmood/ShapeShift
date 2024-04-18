//  ReviewSchema file

// Importing dependencies
import mongoose, { Schema } from "mongoose"; // Importing mongoose and Schema from mongoose package.

// Defining the review schema using the Schema constructor
const ReviewSchema = new Schema(
  {
    // Reference to the user who created the review, required field
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },

    // Reference to the shop being reviewed
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop", // Referencing the Shop model
    },

    // Reference to the product being reviewed
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Referencing the Product model
    },

    // Rating given in the review, required and must be between 1 and 5
    rating: { type: Number, required: true, min: 1, max: 5 },

    // Optional review text
    review: { type: String },
  },
  { timestamps: true } // Automatic timestamps for review creation and modification
);

// Creating the Review model using the schema
const Review = mongoose.model("Review", ReviewSchema);

export default Review; // Exporting the Review model
