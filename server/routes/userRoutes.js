//  Route file for defining user-related endpoints.

// Importing dependencies

import express from "express";

// Importing controllers

import UserController from "../controllers/userController.js";

const router = express.Router();

// User registration route
router.post("/register", UserController.register);

// User login route
router.post("/login", UserController.login);

// Firebase login route
router.post("/firelogin", UserController.fireLogin);

//  Get user profile
router.get("/profile/:id", UserController.getProfileById);

// User profile updating route
router.put("/profile/:id", UserController.updateProfile);

// User logout route
router.post("/logout", UserController.logout);

//changePassword
router.put('/password/:userId', UserController.changePassword);

export default router;
