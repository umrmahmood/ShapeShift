// Importing dependencies
import express from "express"; // Importing Express framework
import dotenv from "dotenv"; // Importing dotenv for environment variables
import cors from "cors"; // Importing CORS middleware for cross-origin requests
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction
import path, { join } from "path"; // Importing path module for file path manipulation

// Importing modules
import UserRoutes from "./routes/userRoutes.js"; // Importing userRoutes.js
import AdminRoutes from "./routes/adminRoutes.js"; // Importing adminRoutes.js
import ProductRoutes from "./routes/productRoutes.js"; // Importing productRoutes.js

// Initializing Express app
const app = express(); // Creating an Express application
const PORT = process.env.PORT || 5001; // Setting the port for the server to listen on, using environment variable or default 5001

// Loading environment variables from .env file
dotenv.config({ path: "./config/.env" }); // Specifying the path to the .env file

// Setting __dirname
const __dirname = path.resolve(); // Resolving the directory name

// Middleware
app.use(cors()); // Enabling CORS middleware for cross-origin requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(express.json()); // Parsing JSON bodies
app.use(express.static("./public")); // Serving static files from the public directory

// Routes
app.use("/", UserRoutes); // Using UserRoutes for user-related routes
app.use("/admin", AdminRoutes); // Using AdminRoutes for admin-related routes
app.use("/", ProductRoutes); // Using ProductRoutes for product-related routes

// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI) // Connecting to MongoDB using the provided URI from environment variables
  .then(() => {
    console.log("DB connected"); // Logging successful database connection
  })
  .catch((error) => {
    console.log(error); // Logging error if database connection fails
  });

// Starting the server
app.listen(PORT, () => {
  console.log(`The server is listening to port: ${PORT}`); // Logging that the server is listening on the specified port
});
