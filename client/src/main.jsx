import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { UserContextProvider } from "./Context/userContext";
import "./index.css";

axios.defaults.baseURL =
    "https://travel-nest-server-razan-marasinis-projects.vercel.app";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </UserContextProvider>
    </React.StrictMode>
);
