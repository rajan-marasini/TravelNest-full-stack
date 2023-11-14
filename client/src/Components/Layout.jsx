import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="py-2 px-3 sm:px-4 md:px-6 lg:px-12 w-full max-w-screen-xl mx-auto  flex flex-col flex-1">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
