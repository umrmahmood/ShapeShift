// File for establishing database connection.

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Connecting to MongoDB using the provided URI from environment variables
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default ConnectDB;
