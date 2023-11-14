import React from "react";

const ShowAllPhotos = ({ place, setShowAllPhotos }) => {
    return (
        <div className="absolute inset-0 p-4 md:p-20 bg-gray-900 z-20 h-fit">
            <h1 className="text-2xl text-white font-bold">
                Photos of {place.title}
            </h1>
            <div className="relative">
                <button
                    onClick={() => setShowAllPhotos(false)}
                    className="fixed flex items-center gap-1 font-semibold px-4 py-2 right-4 md:right-20 rounded-2xl"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="red"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>

                    <span>Close Photos</span>
                </button>
                {place.photos.map((photo) => (
                    <div className="w-full my-2" key={photo}>
                        <img
                            className="h-full w-full object-cover"
                            src={`/uploads/${photo}`}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAllPhotos;
