import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../Context/userContext";

const MyProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/v1/user/logout");
            if (data.success) {
                toast.success(data.message);
            }
            navigate("/");
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-center max-w-lg mx-auto mt-4">
            <h1>
                Logged in as {user?.name} ({user?.email})
            </h1>
            <h1>Phone: {user.phone}</h1>
            <h1>Address: {user.address}</h1>
            <br />
            <button
                onClick={handleLogout}
                className=" primary max-w-sm mt-3 disabled:opacity-70 disabled:cursor-not-allowed
            "
                disabled={isLoading}
            >
                Logout
            </button>
        </div>
    );
};

export default MyProfile;
