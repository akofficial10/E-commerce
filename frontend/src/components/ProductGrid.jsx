import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  sortedProducts,
  handleProductClick,
  search,
  allProducts,
  sortType,
  handleSortChange,
}) => {
  const [selectedSkinType, setSelectedSkinType] =
    useState("For All Skin Types");
  const [skinTypes, setSkinTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(sortedProducts);

  useEffect(() => {
    const dynamicSkinTypes = [
      "For All Skin Types",
      "Oily Skin",
      "Dry Skin",
      "Combination Skin",
      "Sensitive Skin",
    ];
    setSkinTypes(dynamicSkinTypes);
  }, []);

  useEffect(() => {
    if (selectedSkinType === "For All Skin Types") {
      setFilteredProducts(sortedProducts);
    } else {
      const filtered = sortedProducts.filter(
        (product) =>
          product.skinType === selectedSkinType ||
          (product.skinTypes && product.skinTypes.includes(selectedSkinType))
      );
      setFilteredProducts(filtered);
    }
  }, [selectedSkinType, sortedProducts]);

  const toggleSkinType = (type) => {
    setSelectedSkinType(type);
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-full md:w-64 space-y-6">
            {/* Sort Dropdown - Moved to top right */}
            <div className="relative w-full md:w-64">
              <select
                value={sortType}
                onChange={handleSortChange}
                className="w-full appearance-none border-0 rounded-xl px-5 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Skin Type Filter */}
            <div className="bg-white p-4 rounded-lg shadow-xs">
              <h3 className="font-medium text-gray-900 mb-3">Skin Type</h3>
              <div className="space-y-2">
                {skinTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      id={`skin-${type}`}
                      name="skinType"
                      value={type}
                      checked={selectedSkinType === type}
                      onChange={() => toggleSkinType(type)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      htmlFor={`skin-${type}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Products */}
          <div className="flex-1">
            {search && (
              <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg shadow-xs mb-6 inline-block">
                Showing {filteredProducts.length} of {allProducts.length}{" "}
                products
                {search && ` for "${search}"`}
                {selectedSkinType !== "For All Skin Types" && (
                  <span> matching {selectedSkinType}</span>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <ProductCard
                      product={product}
                      handleProductClick={handleProductClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {selectedSkinType !== "For All Skin Types"
                    ? `No products match ${selectedSkinType}`
                    : search
                    ? `We couldn't find any products matching "${search}"`
                    : "There are currently no products available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
