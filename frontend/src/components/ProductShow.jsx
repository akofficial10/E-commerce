import React from "react";
import abt2 from "../assets/abt2.png";
import abt from "../assets/abt.png";
import abt4 from "../assets/abt4.png";
import abt5 from "../assets/abt5.png";

const ProductShow = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8  pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-800 mb-3 sm:mb-4">
            Your skincare journey starts with our trusted essentials
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-4xl mx-auto italic ">
            "DermoDazzle merges dermatology and nature to rejuvenate skin,
            clinically proven to nourish deeply, boost radiance from within,
            shield against environmental stress, and reveal your healthiest glow
            yet."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
          {/* First Row */}
          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
              <img
                src={abt}
                alt="DermoDazzle Sunscreen"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white font-bold text-sm sm:text-xl">
                  DermoDazzle Sun Protection
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
              <img
                src={abt4}
                alt="DermoDazzle Serum"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white font-bold text-sm sm:text-xl">
                  DermoDazzle Renewal Serum
                </span>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
              <img
                src={abt5}
                alt="DermoDazzle Moisturizer"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white font-bold text-sm sm:text-xl">
                  DermoDazzle Hydra Moisturizer
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
              <img
                src={abt2}
                alt="DermoDazzle Cleanser"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white font-bold text-sm sm:text-xl">
                  DermoDazzle Purifying Cleanser
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
