import React from "react";

const PhotoContainer = ({ place, setShowAllPhotos }) => {
    return (
        <div
            className="grid gap-2 grid-cols-3 mt-4 overflow-hidden relative cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
        >
            <div className="col-span-2 row-span-2">
                {place.photos?.[0] && (
                    <>
                        <img
                            className="h-full w-full rounded-2xl object-cover"
                            src={place?.photos[0]}
                            alt=""
                        />
                    </>
                )}
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                {place.photos?.[1] && (
                    <>
                        <img
                            className="rounded-xl"
                            src={place?.photos[1]}
                            alt=""
                        />
                    </>
                )}
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                {place.photos?.[2] && (
                    <>
                        <img
                            className="rounded-xl"
                            src={place?.photos[2]}
                            alt=""
                        />
                    </>
                )}
            </div>

            {place.photos.length > 2 && (
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute bottom-1 right-0 px-4 py-1 rounded-xl shadow-gray-400 shadow-md hover:shadow-lg flex items-center text-sm gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>

                    <span>Show more photos</span>
                </button>
            )}
        </div>
    );
};

export default PhotoContainer;
