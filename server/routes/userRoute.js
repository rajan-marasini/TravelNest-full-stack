import express from "express";
import {
    bookAPlace,
    cancelBooking,
    createUser,
    getAllBookings,
    useProfile,
    userLogin,
    userLogout,
} from "../controllers/userController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/logout", isSignedIn, userLogout);
router.get("/profile", isSignedIn, useProfile);
router.post("/book/:placeId", isSignedIn, bookAPlace);
router.get("/allBookings", isSignedIn, getAllBookings);
router.post("/cancel-booking/:placeId", isSignedIn, cancelBooking);

export { router as userRoute };
