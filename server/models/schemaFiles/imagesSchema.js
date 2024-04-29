import mongoose, { Schema } from "mongoose";

const ProductImageSchema = new Schema(
  {
    public_id: { type: String },
    version_id: { type: String },
    signature: { type: String },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    resource_type: { type: String },
    tags: [{ type: String }],
    url: { type: String },
    productId: { type: String },
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
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
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

const ProductImages = mongoose.model("ProductImages", ProductImageSchema);
const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);
const ShopImages = mongoose.model("ShopImages", ShopImageSchema);

export { ProductImages, ProfileImage, ShopImages };
