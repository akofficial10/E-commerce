import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUpload, FiPlus, FiCheck, FiX } from "react-icons/fi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [skinType, setSkinType] = useState("For all types");
  const [bestseller, setBestseller] = useState(false);
  const [benefits, setBenefits] = useState("");
  const [keyIngredients, setKeyIngredients] = useState("");
  const [volume, setVolume] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

   useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to top on mount
    }, []);

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("skinType", skinType);
      formData.append("bestseller", bestseller);
      formData.append("benefits", benefits);
      formData.append("keyIngredients", keyIngredients);
      formData.append("volume", volume);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPrice("");
        setBestseller(false);
        setBenefits("");
        setKeyIngredients("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg ml-30">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to add a new product to your store
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Images
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <label
                  htmlFor={`image-${index}`}
                  className={`block cursor-pointer h-40 rounded-xl border-2 border-dashed ${
                    image
                      ? "border-transparent"
                      : "border-gray-300 hover:border-blue-400"
                  } transition-all overflow-hidden`}
                >
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage(index);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-blue-500 transition-colors">
                      <FiUpload size={24} className="mb-2" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  )}
                </label>
                <input
                  id={`image-${index}`}
                  type="file"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                type="text"
                placeholder="e.g. Hydrating Facial Serum"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500"> ₹</span>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="00"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
              placeholder="Describe the product in detail..."
              required
            />
          </div>

          {/* Skin Type and Volume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Skin Type
              </label>
              <select
                onChange={(e) => setSkinType(e.target.value)}
                value={skinType}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="For All Skin Types">For All Skin Types</option>
                <option value="Oily Skin">Oily Skin</option>
                <option value="Dry Skin">Dry Skin</option>
                <option value="Combination Skin">Combination Skin</option>
                <option value="Sensitive Skin">Sensitive Skin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Volume
              </label>
              <select
                onChange={(e) => setVolume(Number(e.target.value))}
                value={volume}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value={30}>30ml</option>
                <option value={50}>50ml</option>
                {/* <option value={100}>100ml</option> */}
              </select>
            </div>
          </div>

          {/* Best Seller */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center h-5">
              <input
                onChange={() => setBestseller((prev) => !prev)}
                checked={bestseller}
                type="checkbox"
                id="bestseller"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <label
              htmlFor="bestseller"
              className="text-sm font-medium text-gray-700 cursor-pointer flex items-center"
            >
              Mark as Best Seller
              {bestseller && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center">
                  <FiCheck className="mr-1" size={12} /> Featured
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Benefits</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Key Benefits <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={(e) => setBenefits(e.target.value)}
              value={benefits}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
              placeholder="List the main benefits of using this product (one per line or comma separated)"
              required
            />
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Key Ingredients <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={(e) => setKeyIngredients(e.target.value)}
              value={keyIngredients}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
              placeholder="List the active ingredients in this product (one per line or comma separated)"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
