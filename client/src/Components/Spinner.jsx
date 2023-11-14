import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
    return (
        <div className="h-[70vh] w-full grid place-items-center">
            <ClipLoader />
        </div>
    );
};

export default Spinner;
