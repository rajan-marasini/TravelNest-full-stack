import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Perks from "../../Components/Perks";

const AddNewPlace = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuest, setMaxGuest] = useState(1);
    const [price, setPrice] = useState(0);

    const handleCheckBoxClick = (e) => {
        const { name } = e.target;

        if (perks.includes(name)) {
            setPerks((prev) => [...prev.filter((perk) => perk != name)]);
        } else {
            setPerks((prev) => [...prev, name]);
        }
    };

    const uploadImageByLink = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);
            const { data: photo } = await axios.post(
                "/api/v1/image/upload-by-link",
                {
                    link: photoLink,
                }
            );
            setAddedPhotos((prev) => [...prev, photo]);
            setPhotoLink("");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleUploadPhoto = async (e) => {
        e.preventDefault();
        try {
            const files = e.target.files;
            const photos = new FormData();

            const imageUrl = [];

            for (let i = 0; i < files.length; i++) {
                photos.append("photos", files[i]);
            }
            const { data } = await axios.post("/api/v1/image/upload", photos, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            for (const photo of data) {
                imageUrl.push(photo);
            }

            setAddedPhotos((prev) => [...prev, ...imageUrl]);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const removePhoto = (photo) => {
        setAddedPhotos([...addedPhotos.filter((photos) => photos != photo)]);
    };

    const makeIndex = (index) => {
        setAddedPhotos([
            index,
            ...addedPhotos.filter((photo) => photo != index),
        ]);
    };

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);

            const { data } = await axios.post("/api/v1/place/create", {
                title,
                description,
                address,
                photos: addedPhotos,
                perks,
                checkIn,
                checkOut,
                maxGuest,
                price,
                extraInfo,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/account/places");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form>
                <h2 className="text-2xl mt-4">Title:</h2>
                <p className="text-gray-500 text-sm">
                    Title for your place, should be short and catchy as in
                    advertisement
                </p>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <h2 className="text-2xl mt-4">Address:</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input
                    type="text"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <h2 className="text-2xl mt-4">Photos:</h2>
                <p className="text-gray-500 text-sm">
                    More photos will be appreciated
                </p>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Upload photo by link ...jpg"
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                    />
                    <button
                        className="bg-primary whitespace-nowrap px-6 py-0 rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={uploadImageByLink}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading" : "Add Photo"}
                    </button>
                </div>
                <div className="mt-2 grid gap-2 gap-y-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 && (
                        <>
                            {addedPhotos.map((photo, i) => (
                                <div key={i} className="h-32 relative">
                                    <img
                                        src={photo}
                                        alt=""
                                        className="rounded-xl  object-cover w-full h-full"
                                    />
                                    <div
                                        className={`
                                            ${
                                                i == 0
                                                    ? "text-black"
                                                    : "text-white"
                                            }
                                            absolute left-1 bottom-1  bg-gray-300 cursor-pointer rounded-full p-0.5`}
                                        onClick={() => makeIndex(photo)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${i == 0 ? "red" : "none"}`}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="absolute bottom-1 right-1 text-white bg-gray-400
                                    rounded-full p-0.5 cursor-pointer"
                                        onClick={() => removePhoto(photo)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <label className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 inline-flex items-center gap-1">
                        <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleUploadPhoto}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-8 h-8"
                        >
                            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                        <span>Upload</span>
                    </label>
                </div>

                <h2 className="text-2xl mt-4">Description:</h2>
                <p className="text-gray-500 text-sm">
                    A brief Description to your place
                </p>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-32"
                ></textarea>

                <h2 className="text-2xl mt-4">Perks:</h2>
                <p className="text-gray-500 text-sm">
                    Select all the perks of your places
                </p>
                <Perks
                    perks={perks}
                    handleCheckBoxClick={handleCheckBoxClick}
                />

                <h2 className="text-2xl mt-4">Check in and out time:</h2>
                <p className="text-gray-500 text-sm">
                    Add check in and out times, remember to have some time to
                    clean the window between the guests
                </p>
                <div className="grid sm:gap-2 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In time</h3>
                        <input
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="text"
                            placeholder="14:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out time</h3>
                        <input
                            required
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="text"
                            placeholder="11:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number of guests</h3>
                        <input
                            required
                            value={maxGuest}
                            onChange={(e) =>
                                setMaxGuest(parseInt(e.target.value))
                            }
                            type="number"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            required
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            type="number"
                        />
                    </div>
                </div>

                <h2 className="text-2xl mt-4">Extra info:</h2>
                <p className="text-gray-500 text-sm">
                    Extra information about your place like house rule etc..
                </p>
                <textarea
                    required
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    className="h-32"
                ></textarea>

                <button
                    className="primary my-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddNewPlace;
