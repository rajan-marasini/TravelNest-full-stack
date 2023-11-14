import express from "express";
import {
    createPlace,
    getAllPlace,
    getAllPlaceOfUser,
    getOnePlace,
    updatePlace,
} from "../controllers/placeController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create", isSignedIn, createPlace);
router.put("/update-place/:id", isSignedIn, updatePlace);
router.get("/all-places", getAllPlace);
router.get("/all-places-of-user", isSignedIn, getAllPlaceOfUser);
router.get("/getOnePlace/:id", getOnePlace);

export { router as placeRoute };
