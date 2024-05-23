// // messageRoutes.js

// import express from "express";
// import admin from "firebase-admin";
// import MessageController from "../firebase/messageController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get conversations by user ID
// router.get(
//   "/:firebaseId",
//   authMiddleware.authenticated,
//   MessageController.getConversationsByUserId
// );

// // Send a new message
// router.post(
//   "/send",
//   authMiddleware.authenticated,
//   MessageController.sendMessage
// );

// export default router;
