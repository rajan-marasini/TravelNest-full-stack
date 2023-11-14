import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookingWidget from "../Components/BookingWidget.jsx";
import PhotoContainer from "../Components/PhotoContainer.jsx";
import ShowAllPhotos from "../Components/ShowAllPhotos.jsx";
import Spinner from "../Components/Spinner.jsx";
import UserContext from "../Context/userContext.jsx";

const PlacePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [booking, setBooking] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [place, setPlace] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guest, setGuest] = useState(1);
    const [cancelBooking, setCancelBooking] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getOnePlace = async () => {
            setIsLoading(true);
            const { data } = await axios.get(`/api/v1/place/getOnePlace/${id}`);
            setPlace(data.place);
            setIsLoading(false);
        };

        const getAllBookings = async () => {
            const placeIds = [];
            const { data } = await axios.get("/api/v1/user/allBookings");

            for (let i = 0; i < data.bookings.length; i++) {
                placeIds.push(data.bookings[i].placeId);
            }

            setCancelBooking(placeIds.includes(id));
        };

        {
            user && getAllBookings();
        }
        getOnePlace();
    }, [id]);

    if (showAllPhotos) {
        return (
            <ShowAllPhotos setShowAllPhotos={setShowAllPhotos} place={place} />
        );
    }

    const handleBooking = async () => {
        if (!user) {
            toast.error("You must login to book this place");
            return;
        }

        if (user.email === place.owner) {
            toast.error("You already owned this place");
            return;
        }

        try {
            setBooking(true);

            const { data } = await axios.post(`/api/v1/user/book/${place.id}`, {
                checkIn,
                checkOut,
                guest,
                placeId: id,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBooking(false);
        }
    };

    const handleCancelBooking = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.post(
                `/api/v1/user/cancel-booking/${id}`
            );

            if (data.success) {
                toast.success(data.message);
                navigate("/account/bookings");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return isLoading ? (
        <>
            <Spinner />
        </>
    ) : (
        <>
            {place && (
                <div className="mt-8 bg-gray-50">
                    <h1 className="text-2xl font-normal">{place?.title}</h1>
                    <a
                        className="underline gap-1 font-bold flex items-center"
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                            place?.address
                        )}`}
                        target="_blank"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>

                        <span>{place?.address}</span>
                    </a>
                    <PhotoContainer
                        place={place}
                        setShowAllPhotos={setShowAllPhotos}
                    />
                    <div className="grid grid-cols-2 mt-4 py-4 gap-4">
                        <div>
                            <div className="">
                                <h1 className="text-xl font-semibold">
                                    Description:
                                </h1>
                                <p className="leading-5 text-gray-700 text-justify">
                                    {place?.description}
                                </p>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div>
                                    <p>
                                        <span className="text-gray-600">
                                            Check-In:
                                        </span>{" "}
                                        <span className="font-bold">
                                            {place?.checkIn}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-gray-600">
                                            Check-Out:
                                        </span>{" "}
                                        <span className="font-bold">
                                            {place?.checkOut}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-gray-600">
                                            Max-Guest:
                                        </span>{" "}
                                        <span className="font-bold">
                                            {place?.maxGuest}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium">
                                        Perks
                                    </h4>
                                    {place?.perks && (
                                        <div className="grid grid-cols-2 gap-x-1 gap-y-4">
                                            {place.perks.map((perk) => (
                                                <p
                                                    key={perk}
                                                    className="flex items-center gap-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        readOnly
                                                        checked
                                                    />
                                                    <span className="capitalize font-medium">
                                                        {perk}
                                                    </span>
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <BookingWidget
                                place={place}
                                checkIn={checkIn}
                                checkOut={checkOut}
                                setCheckIn={setCheckIn}
                                setCheckOut={setCheckOut}
                                guest={guest}
                                setGuest={setGuest}
                            />

                            {cancelBooking ? (
                                <>
                                    <button
                                        className="primary max-w-xs"
                                        onClick={handleCancelBooking}
                                    >
                                        Cancel Booking
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={`${
                                            booking
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        } primary disabled:opacity-60 max-w-xs`}
                                        onClick={handleBooking}
                                        disabled={booking}
                                    >
                                        {user?.email == place?.owner ? (
                                            <>
                                                <span>
                                                    You owned this place
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    <span>Book this place</span>
                                                    {checkIn && checkOut && (
                                                        <span>
                                                            $
                                                            {differenceInCalendarDays(
                                                                new Date(
                                                                    checkOut
                                                                ),
                                                                new Date(
                                                                    checkIn
                                                                )
                                                            ) * place.price}
                                                        </span>
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="my-4">
                        <h3 className="text-2xl font-semibold">Extra Info:</h3>
                        <p className="text-gray-700 leading-5">
                            {place?.extraInfo}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlacePage;
