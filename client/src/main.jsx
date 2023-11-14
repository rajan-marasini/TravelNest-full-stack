import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { UserContextProvider } from "./Context/userContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </UserContextProvider>
);
