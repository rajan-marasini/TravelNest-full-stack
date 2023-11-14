import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner.jsx";
import UserContext from "../../Context/userContext.jsx";

const AllAccomodation = () => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getAllPlaces = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    "/api/v1/place/all-places-of-user"
                );
                setPlaces(data.places);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        getAllPlaces();
    }, []);

    return isLoading ? (
        <>
            <Spinner />
        </>
    ) : (
        <div className="mt-4">
            <div className="flex flex-col gap-4">
                {places?.map((place, i) => (
                    <Link
                        to={`/account/places/edit/${place.id}`}
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
    );
};

export default AllAccomodation;
