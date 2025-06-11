import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import IngredientCard from "./components/IngredientCard";
import SustainabilityBadge from "./components/SustainabilityBadge";
import TeamMember from "./components/TeamMember"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./components/CheckOut";
import Verify from "./pages/Verify";
// import MyProfile from "./components/MyProfile";

const App = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <ToastContainer />
      <AnnouncementBar />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/ingredients" element={<IngredientCard />} />
        <Route path="/about/team" element={<TeamMember />} />
        <Route path="/about/sustainability" element={<SustainabilityBadge />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/verify" element={<Verify />} />   
        {/* <Route path="/my-profile" element={<MyProfile />} />    */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
