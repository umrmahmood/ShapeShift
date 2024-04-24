import mongoose, { Schema } from "mongoose";

const ItemImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    caption: String,
    tags: [String],
  },
  { timestamps: true }
);

const ProfileImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ShopImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    imageType: {
      type: String,
      enum: ["profile", "banner"],
      required: true,
    },
  },
  { timestamps: true }
);

const ProductImages = mongoose.model("ProductImages", ItemImageSchema);
const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);
const ShopImages = mongoose.model("ShopImages", ShopImageSchema);

export { ProductImages, ProfileImage, ShopImages };
