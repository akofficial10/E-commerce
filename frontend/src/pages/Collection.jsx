import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ProductGrid from "../components/ProductGrid";
import BenefitsSection from "../components/BenefitsSection";
import HowToApplySection from "../components/HowToApplySection";
import FaqSection from "../components/FaqSection";
import Singleimg from "../components/Singleimg";


const Collection = () => {
  const { products, search, allProducts } = useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");
  const [sortedProducts, setSortedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let result = [...products];
    switch (sortType) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedProducts(result);
  }, [products, sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on mount
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
     <Singleimg />
      <ProductGrid
        sortedProducts={sortedProducts}
        handleProductClick={handleProductClick}
        search={search}
        allProducts={allProducts}
        sortType={sortType}
        handleSortChange={handleSortChange}
      />
      <HowToApplySection />
      <BenefitsSection />
      <div className="product-page">
        <BeforeAfterSlider
          product={{
            id: "aaaac",
            name: "Vitamin C Serum",
            beforeImage: "/frontend/src/assets/abt.png",
            afterImage: "/frontend/src/assets/abt2.png",
            resultsDuration: "6 weeks of use",
          }}
        />
      </div>
      <FaqSection />
    </div>
  );
};

export default Collection;
