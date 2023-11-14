import asyncHandler from "express-async-handler";
import { cloudinary } from "../config/cloudinaryConfig.js";

export const uploadPhoto = asyncHandler(async (req, res) => {
    try {
        // Check if image files were provided
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ message: "No image files provided" });
        }

        const uploadedImages = [];

        // Upload each image to Cloudinary
        for (const file of req.files) {
            await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) {
                                console.error(error);
                                reject({ message: "Image upload failed" });
                            } else {
                                // Image successfully uploaded, add Cloudinary response to the array
                                uploadedImages.push(result);
                                resolve();
                            }
                        }
                    )
                    .end(file.buffer);
            }).catch((error) => {
                console.error(error);
                res.status(500).send({ message: "Internal server error" });
            });
        }

        res.status(200).send(uploadedImages);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

export const uploadByLink = async (req, res) => {
    try {
        const { link } = req.body;

        cloudinary.uploader
            .upload(link)
            .then((result) => {
                res.status(200).send(result.url);
            })
            .catch((err) => {
                res.status(200).send(err.message);
            });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
