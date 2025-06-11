import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 2));
  }, [products]);

  return (
    <div className="my-0.1">
      <div className="text-center py-4 sm:py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-700 mb-2 sm:mb-3">
          Latest Collection
        </h2>
        <p className="w-5/6 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 italic pb-8">
          DermoDazzle brings you dermatologist-approved skincare, blending
          nature, innovation for radiant, healthy skin nourishes, and enhances
          your natural glow..
        </p>
      </div>

      {/* Products Row - Adjusted for mobile */}
      <div className="flex flex-row justify-center items-center px-2 sm:px-4 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-2 sm:gap-10 w-full">
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="w-full h-full transform scale-90 sm:scale-100 hover:scale-101   transition-transform duration-300"
            >
              <ProductItem id={item._id} image={item.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
