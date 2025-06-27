import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import ProductShow from "../components/ProductShow";
import OurPolicy from "../components/OurPolicy";
import Blog from "../components/Blog";
import Testimonial from "../components/Testimonial";
import NewsLetterBox from "../components/NewsLetterBox";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Video from "../components/Video";
import Stat from "../components/Stats";

const Home = () => {
  const { search } = useContext(ShopContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (search && search.trim() !== "") {
      navigate("/collection");
    }
  }, [search, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on mount
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <LatestCollection />
      <Stat />
      <ProductShow />
      <Video />
      <Blog />
      <OurPolicy />
      <Testimonial />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
