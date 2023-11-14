import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner.jsx";
import UserContext from "../../Context/userContext.jsx";

const MyBookings = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let placeIds = [];
        const getAllBookings = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/api/v1/user/allBookings");

                for (let i = 0; i < data?.bookings?.length; i++) {
                    placeIds.push(data?.bookings[i].placeId);
                }

                try {
                    for (let i = 0; i < placeIds.length; i++) {
                        const res = await axios.get(
                            `/api/v1/place/getOnePlace/${placeIds[i]}`
                        );

                        setAllBookings([...allBookings, res.data.place]);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        getAllBookings();
    }, []);

    return isLoading ? (
        <>
            <Spinner />
        </>
    ) : (
        allBookings.length > 0 && (
            <div className="mt-4">
                <div className="flex flex-col gap-4">
                    {allBookings?.map((place, i) => (
                        <Link
                            to={`/place/${place?.id}`}
                            className="bg-gray-200 p-4 rounded-2xl flex flex-col md:flex-row gap-2"
                            key={i}
                        >
                            <img
                                src={place?.photos[0]}
                                alt=""
                                className="md:h-44 md:w-44 w-full h-52
                             object-cover rounded-2xl
                             mx-auto
                            "
                            />

                            <div>
                                <h2
                                    className="font-bold
                        "
                                >
                                    {place?.title}
                                </h2>
                                <p className="text-sm text-gray-700">
                                    {place?.description}
                                    {"..."}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    );
};

export default MyBookings;
