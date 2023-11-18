import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { imageRoute } from "./routes/imageRoute.js";
import { placeRoute } from "./routes/placeRoute.js";
import { userRoute } from "./routes/userRoute.js";

dotenv.config();

const app = express();

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    cors({
        origin: [
            "https://travel-nest-full-stack-one.vercel.app",
            "https://travel-nest-full-stack-razan-marasinis-projects.vercel.app",
            "https://travel-nest-full-stack-git-main-razan-marasinis-projects.vercel.app",
        ],
        credentials: true,
    })
);

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/place", placeRoute);
app.use("/api/v1/image", imageRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(colors.cyan(`Server is running on port ${PORT}`));
});
