//  ShopSchema file

// Importing dependencies
import mongoose from "mongoose";

const ProductSchema = new Schema({
  name: {},
  description: {},
  category: {},
  price: {},
  images: [{}],
  seller: {},
  designer: {},
  quantity: {},
  dimensions: { width: {}, height: {}, depth: {} },
  material: {},
  tags: [{}],
  ratings: [{ user: {}, rating: {}, review: {} }],
  createdAt: {},
  updatedAt: {},
  timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
