import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/userContext";

const Header = () => {
    const { user, search, setSearch } = useContext(UserContext);
    return (
        <>
            <header className="flex justify-between sticky top-2 z-10">
                <Link to={"/"} href="" className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 -rotate-90"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                    <span className="font-bold hidden md:inline">
                        <span>Travel</span>
                        <span className="text-primary">Nest</span>
                    </span>
                </Link>
                <div className="flex items-center border border-gray-300 rounded-full py-0 px-2 gap-2 shadow-md shadow-gray-300 min-w-[15rem] max-w-[35rem] md:flex-1 pr-6">
                    <input
                        type="text"
                        placeholder="Search for place or address"
                        className="border-none outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-primary rounded-full p-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.0}
                            stroke="currentColor"
                            className="w-4 h-4 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
                <Link
                    to={user ? "/account/profile" : "/login"}
                    className="flex items-center border border-gray-300 rounded-full py-1 px-2 md:py-2 md:px-4 gap-2 hover:shadow-md hover:shadow-gray-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-7 h-7 "
                    >
                        <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="hidden sm:inline">{user?.name}</span>
                </Link>
            </header>
        </>
    );
};

export default Header;
