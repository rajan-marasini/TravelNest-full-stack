import express from "express";
import multer from "multer";
import { uploadByLink, uploadPhoto } from "../controllers/imageController.js";

const router = express.Router();

const photoMiddleware = multer({
    storage: multer.memoryStorage(),
});

router.post("/upload-by-link", uploadByLink);
router.post("/upload", photoMiddleware.array("photos", 50), uploadPhoto);

export { router as imageRoute };
