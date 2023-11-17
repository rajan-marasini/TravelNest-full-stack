import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createPlace = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        const {
            title,
            description,
            address,
            photos,
            perks,
            checkIn,
            checkOut,
            maxGuest,
            price,
            extraInfo,
        } = req.body;

        const place = await prisma.place.create({
            data: {
                title,
                description,
                address,
                photos,
                perks,
                checkIn,
                checkOut,
                maxGuest,
                price,
                extraInfo,
                owner: user.email,
            },
        });

        const { id } = place;

        await prisma.user.update({
            where: { id: user.id },
            data: {
                place: {
                    connect: { id },
                },
            },
        });

        res.status(201).send({
            success: true,
            message: "Successfully created place",
            place,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const getAllPlace = asyncHandler(async (req, res) => {
    try {
        const places = await prisma.place.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).send({ places });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});

export const updatePlace = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const place = await prisma.place.update({
            where: { id },
            data: updatedData,
        });

        res.status(200).send({
            success: true,
            message: "Successfully updated",
            place,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const getAllPlaceOfUser = asyncHandler(async (req, res) => {
    try {
        const { user } = req;

        const places = await prisma.place.findMany({
            where: { owner: user.email },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).send({ places });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

export const getOnePlace = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const place = await prisma.place.findUnique({ where: { id } });

        if (!place) {
            return res.status(200).send({
                success: false,
                message: "No bookings",
            });
        }

        res.status(200).send({ place });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});
