// Importing dependencies
import express from "express"; // Importing Express framework
import dotenv from "dotenv"; // Importing dotenv for environment variables
import cors from "cors"; // Importing CORS middleware for cross-origin requests
import path, { join } from "path"; // Importing path module for file path manipulation

// Importing modules
import ConnectDB from "./db/connect.js";
import UserRoutes from "./routes/userRoutes.js"; // Importing userRoutes.js
import ProductRoutes from "./routes/productRoutes.js";
import ImageRoutes from "./routes/imageRoutes.js";
import ShopRoutes from "./routes/shopRoutes.js";
// import AdminRoutes from "./routes/adminRoutes.js"; // Importing adminRoutes.js
// import ProductRoutes from "./routes/productRoutes.js"; // Importing productRoutes.js

// Initializing Express app
const app = express(); // Creating an Express application

const PORT = 5001; // Setting the port for the server to listen on, using environment variable or default 5001

//const PORT = process.env.PORT || 5001; // Setting the port for the server to listen on, using environment variable or default 5001

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
app.use("/api/users", UserRoutes); // Using UserRoutes for user-related routes
app.use("/api/products", ProductRoutes);
app.use("/api/images", ImageRoutes);
app.use("/api/shop", ShopRoutes);

// Mongoose connection
ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is listening to port: ${PORT}`); // Logging that the server is listening on the specified port
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
