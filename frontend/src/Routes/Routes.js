import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Testimonials from "../pages/Testimonials";
import Profile from "../pages/Profile";
import Membership from "../pages/Membership";
import LandingPage from "../pages/Landing";
import ExploreBooks from "../pages/ExploreBooks";
import Cards from "../Components/Cards";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Checkout from "../pages/Checkout";
import Comingsoon from "../pages/Comingsoon";
import BookDetails from "../pages/BookDetails";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/ExploreBooks" element={<ExploreBooks />} />
        <Route path="/Membership" element={<Membership />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Comingsoon" element={<Comingsoon />} />
        <Route path="/checkout/:price" element={<Checkout />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
    </Routes>
);

export default AppRoutes;
