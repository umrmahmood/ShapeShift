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
    public_id: { type: String },
    version_id: { type: String },
    signature: { type: String },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    resource_type: { type: String },
    tags: [{ type: String }],
    url: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

const ShopImageSchema = new Schema(
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
    shopId: { type: String },
  },
  { timestamps: true }
);

const ShopBannerSchema = new Schema(
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
    shopId: { type: String },
  },
  { timestamps: true }
);

const ProductImages = mongoose.model("ProductImages", ProductImageSchema);
const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);
const ShopImage = mongoose.model("ShopImage", ShopImageSchema);
const ShopBanner = mongoose.model("ShopBanner", ShopBannerSchema);

export { ProductImages, ProfileImage, ShopImage, ShopBanner };
