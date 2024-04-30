import express from "express";
import ImageController from "../controllers/imageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import Parser from "../config/multerConfig.js";

const router = express.Router();

router.post(
  "/:productId",
  authMiddleware.authenticated,
  Parser.array("images", 5),
  ImageController.uploadImage
);
// router.post("/upload/image", ImageController.uploadImage);
// router.post("/update/:imageId", ImageController.updateImage);
//router.post("/delete/:imageId", ImageController.deleteImage);

export default router;
