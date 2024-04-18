//  CartSchema file

// Importing dependencies
import mongoose, { Schema, mongo } from "mongoose";
import Product from "./productSchema";

const CartSchema = new Schema(
  {
    user: {},

    items: [
      {
        product: {},
        quantity: {},
        price: {},
      },
    ],

    totalPrice: {},
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
