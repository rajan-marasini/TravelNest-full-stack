import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";

export const isSignedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (token) {
            const { id } = await jwt.verify(token, process.env.JWT_SECRET);

            const user = await prisma.user.findUnique({ where: { id } });

            delete user.password;

            req.user = user;

            next();
        } else {
            res.status(200).send({ message: "you need to login" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
