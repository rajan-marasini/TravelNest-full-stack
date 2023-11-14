import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Account from "./pages/Account/Account";
import AddNewPlace from "./pages/Account/AddNewPlace";
import AllAccomodation from "./pages/Account/AllAccomodation";
import EditPlace from "./pages/Account/EditPlace";
import MyAccomodation from "./pages/Account/MyAccomodation";
import MyBookings from "./pages/Account/MyBookings";
import MyProfile from "./pages/Account/MyProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PlacePage from "./pages/PlacePage";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/place/:id" element={<PlacePage />} />
                    <Route path="/account" element={<Account />}>
                        <Route path="profile" element={<MyProfile />} />
                        <Route path="bookings" element={<MyBookings />} />
                        <Route element={<MyAccomodation />}>
                            <Route
                                index
                                path="places"
                                element={<AllAccomodation />}
                            />
                            <Route
                                path="places/new"
                                element={<AddNewPlace />}
                            />
                            <Route
                                path="places/edit/:id"
                                element={<EditPlace />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
