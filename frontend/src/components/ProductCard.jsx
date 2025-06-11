import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product, handleProductClick }) => {
  const { addToCart } = useContext(ShopContext);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product._id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: 0 }}
            animate={{ opacity: 1, y: 10, x: 0 }}
            exit={{ opacity: 0, y: -100, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-0 right-4 z-50"
          >
            <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 border-l-4 border-emerald-600">
              <FiShoppingCart className="text-white text-lg" />
              <div>
                <p className="font-medium">Added to cart!</p>
                <p className="text-xs opacity-90">{product.name}</p>
              </div>
              <FiCheck className="ml-2 text-white text-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Card */}
      <div
        className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleProductClick(product._id)}
      >
        <div className="w-full h-80 bg-gray-100 overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full object-contain"
            />
          </div>
        </div>

        <div className="p-5">
          {product.spf && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
              SPF {product.spf}
            </span>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-sm font-medium text-gray-500 mb-1">
              {product.brand}
            </p>
          )}
          {product.description && (
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          )}
          <ul className="text-xs text-gray-600 mb-3 space-y-1">
            {product.features?.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {product.rating} ({product.reviews} Reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-xs text-green-600 ml-2">
                  {product.discount}% off
                </span>
              )}
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
              onClick={handleAddToCart}
            >
              Add to cart 

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
