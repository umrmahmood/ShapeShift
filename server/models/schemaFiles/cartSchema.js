//  CartSchema file

// Importing dependencies
import mongoose, { Schema } from "mongoose";
import Product from "./productSchema"; // Importing the Product schema to fetch product details.

// Defining the Cart schema using the Schema constructor.
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who owns the cart, required.

    items: [
      {
        // Array of items in the cart.
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Reference to the product added to the cart, required.
        quantity: { type: Number, required: true, default: 1 }, // Quantity of the product in the cart, defaults to 1.
      },
    ],

    totalPrice: { type: Number, required: true, default: 0 }, // Total price of all items in the cart, defaults to 0.
  },
  { timestamps: true } // Automatic timestamps for cart creation and modification.
);

// Middleware function to calculate the total price before saving the cart.
CartSchema.pre("save", async function (next) {
  try {
    let totalPrice = 0; // Initialize total price.
    // Loop through each item in the cart.
    for (const item of this.items) {
      // Fetch the product details from the database based on its ID.
      const product = await Product.findById(item.product);
      // Calculate the subtotal price for the current item and add it to the total price.
      totalPrice += product.price * item.quantity;
    }
    // Assign the calculated total price to the totalPrice field of the cart.
    this.totalPrice = totalPrice;
    next(); // Proceed to save the cart.
  } catch (error) {
    next(error); // Handle any errors that occur during the process.
  }
});

// Creating the Cart model using the schema.
const Cart = mongoose.model("Cart", CartSchema);

export default Cart; // Exporting the Cart model.
