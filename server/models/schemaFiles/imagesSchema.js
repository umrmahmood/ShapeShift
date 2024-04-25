import mongoose, { Schema } from "mongoose";

const ProductImageSchema = new Schema(
  {
    url: [
      {
        type: String,
        //required: true,
      },
    ],
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      //required: true,
    },
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
