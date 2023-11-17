import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const userExist = await prisma.user.findUnique({ where: { email } });

        if (!userExist) {
            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone,
                    address,
                },
            });
            return res.status(201).send({
                success: true,
                message: "Successfully registered...",
                user,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: "User already exist",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const userLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            const passwordMatch = await comparePassword(
                password,
                user.password
            );

            if (passwordMatch) {
                const token = await jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                delete user.password;

                res.status(200)
                    .cookie("token", token, {
                        httpOnly: true,
                        sameSite: "none",
                    })
                    .send({
                        success: true,
                        message: "Login Successful",
                        user,
                    });
            } else {
                res.status(200).send({
                    success: false,
                    message: "Invalid credentials",
                });
            }
        } else {
            res.status(200).send({
                success: false,
                message: "User doesn't exist",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const userProfile = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        res.send({ user });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
        });
    }
});

export const userLogout = async (req, res) => {
    try {
        res.status(200).cookie("token", "").send({
            success: true,
            message: "Successfully logged out",
            user: null,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

export const bookAPlace = asyncHandler(async (req, res) => {
    try {
        const { user } = req;
        const { placeId } = req.params;
        const { checkIn, checkOut, guest } = req.body;

        const { bookings } = user;

        if (bookings.some((booking) => booking.placeId == placeId)) {
            if (
                bookings.some(
                    (book) =>
                        (book.checkIn <= checkIn && checkIn <= book.checkOut) ||
                        (book.checkIn <= checkOut && checkOut <= book.checkOut)
                )
            ) {
                return res.status(200).send({
                    success: false,
                    message: "This place is already booked",
                });
            } else {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        bookings: {
                            push: {
                                placeId,
                                checkIn,
                                checkOut,
                                guest,
                            },
                        },
                    },
                });

                res.status(200).send({
                    success: true,
                    message: "Successfully booked",
                });
            }
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    bookings: {
                        push: {
                            placeId,
                            checkIn,
                            checkOut,
                            guest,
                        },
                    },
                },
            });

            res.status(200).send({
                success: true,
                message: "Successfully booked",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const getAllBookings = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        const { bookings } = user;

        if (!bookings) {
            return res.status(200).send({
                success: false,
                message: "No booking availabe",
            });
        } else {
            return res.status(200).send({ bookings });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const cancelBooking = asyncHandler(async (req, res) => {
    try {
        const { user } = req;
        const { placeId } = req.params;

        const { bookings } = user;

        const index = bookings.findIndex(
            (booking) => booking.placeId == placeId
        );

        if (index == -1) {
            return res.send({ message: "This place is not booked by you" });
        } else {
            bookings.splice(index, 1);
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    bookings,
                },
            });
            res.status(200).send({
                success: true,
                message: "Booking canceled Successfully",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
