import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/v1/user/register", {
                name,
                email,
                password,
                phone,
                address,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/login");
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
        <div className="mt-24">
            <h1 className="text-4xl text-center mb-5 font-bold">Register</h1>
            <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    required
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    className="primary my-2 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isLoading}
                >
                    Register
                </button>
            </form>
            <p className="text-center py-2 text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="underline text-black">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
