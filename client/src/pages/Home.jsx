import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import UserContext from "../Context/userContext";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const { search } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        const getPlaces = async () => {
            try {
                const { data } = await axios.get("/api/v1/place/all-places");
                setPlaces([...data.places]);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        getPlaces();
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter(
            (place) =>
                place.title.toLowerCase().includes(search.toLowerCase()) ||
                place.address.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResult(filteredPlaces);
    }, [places, search]);

    return loading ? (
        <>
            <Spinner />
        </>
    ) : (
        <div
            className="my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-10 
        "
        >
            {searchResult?.length > 0 &&
                searchResult.map((place, i) => (
                    <Link
                        key={i}
                        className="cursor-pointer py-6"
                        to={`place/${place.id}`}
                    >
                        <div className="rounded2xl flex h-full w-full">
                            {place.photos?.[0] && (
                                <img
                                    src={place.photos[0]}
                                    alt=""
                                    className="rounded-2xl h-48 w-full object-cover transition-all duration-300 ease-in-out  hover:scale-105 bg-center
                                    "
                                />
                            )}
                        </div>
                        <h2 className=" mt-2 text-sm truncate leading-4">
                            {place.title}
                        </h2>
                        <h2 className="font-semibold truncate">
                            {place.address}
                        </h2>
                        <p className="text-xs text-gray-600">
                            <span className="font-bold text-black">
                                {" "}
                                ${place.price}{" "}
                            </span>{" "}
                            per night
                        </p>
                    </Link>
                ))}
        </div>
    );
};

export default Home;
