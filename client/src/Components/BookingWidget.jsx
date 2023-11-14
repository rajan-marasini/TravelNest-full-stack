import React, { useContext } from "react";
import UserContext from "../Context/userContext";

const BookingWidget = ({
    place,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    guest,
    setGuest,
}) => {
    const { user } = useContext(UserContext);
    return (
        <div className="bg-white shadow rounded-2xl overflow-hidden max-w-xs mx-auto">
            <h3 className="text-base font-medium text-center bg-primary text-white py-2 rounded-xl mb-2">
                <span className="text-gray-600 font-normal">Price:</span> $
                {place.price}/per night
            </h3>
            <div className="border flex flex-col justify-between">
                <div className="">
                    <label className="w-full">
                        <span className="font-medium">CheckIn:</span>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className=" flex">
                    <label className="w-full">
                        <span className="font-medium">CheckOut:</span>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </label>
                </div>
            </div>
            <div className=" flex">
                <label className="w-full">
                    <span className="font-medium flex gap-1">
                        <span className="hidden sm:inline">No.of </span>
                        <span>Guest</span>
                    </span>
                    <input
                        type="number"
                        max={place.maxGuest}
                        min={1}
                        className="border-2 border-black"
                        value={guest}
                        onChange={(e) => setGuest(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="flex">
                <label className="w-full">
                    <span className="font-medium">Name:</span>
                    <input
                        className="font-bold font-xl"
                        type="text"
                        value={user ? user.name : ""}
                        readOnly
                        placeholder={user ? "" : "You need to login to fill"}
                    />
                </label>
            </div>
            <div className="flex">
                <label className="w-full">
                    <span className="font-medium">Phone:</span>
                    <input
                        className="font-bold font-xl"
                        type="text"
                        value={user ? user.phone : ""}
                        readOnly
                        placeholder={user ? "" : "You need to login to fill"}
                    />
                </label>
            </div>
        </div>
    );
};

export default BookingWidget;
