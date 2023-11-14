import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../Context/userContext";

const Login = () => {
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/v1/user/login", {
                email,
                password,
            });

            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-32">
            <h1 className="text-4xl text-center mb-5 font-bold">Login</h1>
            <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
                <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="primary my-2 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isLoading}
                >
                    Login
                </button>
            </form>
            <p className="text-center py-2 text-gray-500">
                Don't have an account yet?{" "}
                <Link to={"/register"} className="underline text-black">
                    Register now
                </Link>
            </p>
        </div>
    );
};

export default Login;
