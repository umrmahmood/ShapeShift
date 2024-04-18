//  ReviewSchema file

// Importing dependencies
import mongoose, { Schema, mongo } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
