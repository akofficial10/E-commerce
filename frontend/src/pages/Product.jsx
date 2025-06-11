import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ProductDetails from "../components/ProductDetails";
import ProductFAQ from "../components/ProductFAQ";
import {
  FiChevronRight,
  FiCheck,
  FiTruck,
  FiDroplet,
  FiSun,
  FiShoppingCart,
  FiShield,
  FiRepeat,
  FiUser,
  FiStar,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const renderStars = (rating, interactive = false, onStarClick = () => {}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : "div"}
          onClick={() => interactive && onStarClick(star)}
          className={`${
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : ""
          }`}
        >
          <svg
            className={`w-5 h-5 ${
              star <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const {
    getProductById,
    addToCart,
    loading,
    error,
    submitReview,
    fetchReviews,
  } = useContext(ShopContext);

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("benefits");
  const [showToast, setShowToast] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
    name: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const navigate = useNavigate();

  const product = getProductById(id);

  // Calculate rating distribution
  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (Array.isArray(reviews)) {
      reviews.forEach((review) => {
        const rating = Math.floor(Number(review.rating));
        if (rating >= 1 && rating <= 5) {
          distribution[rating]++; 
        }
      });
    }

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();

  useEffect(() => {
    if (product?.image?.length) {
      setMainImage(product.image[0]);
    }

    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviews(id);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setReviews([]);
      }
    };

    loadReviews();
  }, [product, id, fetchReviews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    setBuyNowLoading(true);

    try {
      await addToCart(product._id, quantity);
      navigate("/checkout", {
        state: {
          fromBuyNow: true,
          productName: product.name,
        },
      });
    } catch (error) {
      console.error("Buy Now failed:", error);
      toast.error(
        error.message || "Failed to proceed to checkout. Please try again."
      );
    } finally {
      setBuyNowLoading(false);
    }
  };

  const handleStarClick = (star) => {
    setReviewForm({ ...reviewForm, rating: star });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");

    if (!reviewForm.rating) {
      setReviewError("Please select a rating");
      setReviewLoading(false);
      return;
    }

    if (!reviewForm.comment.trim()) {
      setReviewError("Please write a review");
      setReviewLoading(false);
      return;
    }

    try {
      const newReview = {
        productId: product._id,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      };

      await submitReview(newReview);

      const updatedReviews = await fetchReviews(product._id);
      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);

      setReviewForm({
        rating: 0,
        comment: "",
      });
      setShowReviewForm(false);

      toast.success("Review submitted successfully!");
    } catch (err) {
      setReviewError(
        err.message || "Failed to submit review. Please try again."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const productBenefits = product?.benefits
    ? product.benefits.split("\n").filter((b) => b.trim())
    : ["No benefits information available"];

  const productIngredients = product?.keyIngredients
    ? product.keyIngredients.split("\n").filter((i) => i.trim())
    : ["No ingredients information available"];

  const calculateAverageRating = () => {
    try {
      if (!Array.isArray(reviews)) return product?.rating || 0;
      if (reviews.length === 0) return product?.rating || 0;

      const sum = reviews.reduce((acc, review) => {
        const rating = Number(review.rating) || 0;
        return acc + Math.min(5, Math.max(1, rating));
      }, 0);

      return (sum / reviews.length).toFixed(1);
    } catch (error) {
      console.error("Error calculating average rating:", error);
      return product?.rating || 0;
    }
  };

  const averageRating = calculateAverageRating();
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-700">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-700">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 border-t">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -120, x: 0 }}
              animate={{ opacity: 1, y: 120, x: 0 }}
              exit={{ opacity: 0, y: -120, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-0 right-4 z-50"
            >
              <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 border-l-4 border-emerald-600">
                <FiShoppingCart className="text-white" />
                <div>
                  <p className="font-medium">Added to cart!</p>
                  <p className="text-xs opacity-90">{product.name}</p>
                </div>
                <FiCheck className="text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center text-sm text-gray-500 mb-8">
          <a href="#" className="text-teal-600 hover:text-teal-800">
            Shop
          </a>
          <FiChevronRight className="mx-2 text-gray-400" />
          <a href="#" className="text-teal-600 hover:text-teal-800">
            {product.skinType || "Products"}
          </a>
          <FiChevronRight className="mx-2 text-gray-400" />
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-9">
          {/* Product images and details section */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="relative bg-white overflow-hidden mb-4 h-[450px] flex items-center justify-center border border-gray-100 shadow-sm">
              {product.bestseller && (
                <span className="absolute top-2 left-2 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Bestseller
                </span>
              )}
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="bg-gray-100 flex items-center justify-center h-full w-full rounded-lg">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="flex overflow-x-auto space-x-3 py-2 pl-19 -mx-1">
              {product.image?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden h-16 w-16 transition-all ${
                    mainImage === img
                      ? "ring-2 ring-green-500"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-100 h-full w-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">{i + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mb-6 pt-10">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab("benefits")}
                    className={`py-3 border-b-2 font-medium text-sm ${
                      activeTab === "benefits"
                        ? "border-green-600 text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Key Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab("ingredients")}
                    className={`py-3 border-b-2 font-medium text-sm ${
                      activeTab === "ingredients"
                        ? "border-green-600 text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Ingredients
                  </button>
                </nav>
              </div>

              <div className="py-4">
                {activeTab === "benefits" && (
                  <ul className="space-y-2">
                    {productBenefits.length > 0 ? (
                      productBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <FiCheck className="text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">
                        No benefits information available
                      </li>
                    )}
                  </ul>
                )}
                {activeTab === "ingredients" && (
                  <div className="flex flex-wrap gap-2">
                    {productIngredients.length > 0 ? (
                      productIngredients.map((ingredient, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-50 text-teal-700"
                        >
                          {ingredient}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No ingredients information available
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product info and purchase section */}
          <div className="lg:w-1/2">
            <div className="sticky top-4">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(averageRating)}
                    <span className="text-sm text-gray-600 ml-1">
                      {averageRating} ({reviews.length} reviews)
                    </span>
                  </div>
                  {product.bestseller && (
                    <span className="text-xs font-medium bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-semibold text-gray-900">
                    ₹{product.price}
                  </p>
                  {product.discount && (
                    <span className="text-sm text-rose-600 ml-2">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiDroplet className="text-teal-500 mr-2" />
                    <span className="text-sm">{product.volume || "N/A"}ml</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiSun className="text-teal-500 mr-2" />
                    <span className="text-sm">
                      {product.skinType || "All skin types"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 w-12 text-center border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  onClick={handleBuyNow}
                  disabled={buyNowLoading}
                  className={`w-full border border-teal-600 text-teal-600 hover:bg-teal-50 py-3 px-6 rounded-lg font-medium transition-colors ${
                    buyNowLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {buyNowLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-teal-600"
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
                    "Buy Now"
                  )}
                </button>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiTruck className="text-green-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-500">On orders over ₹499</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiShield className="text-green-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium">
                      Authenticity Guaranteed
                    </p>
                    <p className="text-xs text-gray-500">
                      100% genuine products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetails product={product} />

      {/* Enhanced Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <FiStar className="text-amber-400 mr-1" size={20} />
                  <span className="text-xl font-semibold">{averageRating}</span>
                  <span className="text-gray-500 ml-1">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <div className="hidden md:block h-6 w-px bg-gray-200 mx-4"></div>
                <div className="flex items-center space-x-4">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      className="flex items-center text-sm text-gray-600 hover:text-amber-500 transition-colors"
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                    >
                      <span className="mr-1">{star}★</span>
                      <span className="text-xs text-gray-400">
                        ({ratingDistribution[star]})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!showReviewForm && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReviewForm(true)}
                className="mt-4 md:mt-0 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-all flex items-center"
              >
                <FiStar className="mr-2" />
                Write a Review
              </motion.button>
            )}
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Share Your Experience
                    </h3>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        How would you rate this product?
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            className={`p-1 rounded-full transition-all ${
                              reviewForm.rating >= star
                                ? "bg-amber-100 text-amber-500"
                                : "text-gray-300 hover:text-amber-400"
                            }`}
                          >
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Review
                      </label>
                      <textarea
                        name="comment"
                        value={reviewForm.comment}
                        onChange={handleReviewChange}
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="Share your honest thoughts about this product..."
                        required
                      ></textarea>
                    </div>

                    {reviewError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {reviewError}
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={reviewLoading}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-all disabled:opacity-70 flex items-center justify-center"
                      >
                        {reviewLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                            Submitting...
                          </>
                        ) : (
                          "Submit Review"
                        )}
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {displayedReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full p-3 mr-4 flex-shrink-0">
                      <FiUser className="text-teal-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {review.name || "Anonymous"}
                          </p>
                          <div className="flex items-center mt-1 space-x-3">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500 ml-2">
                                {review.rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-1">
                          {review.title}
                        </h4>
                      )}
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {reviews.length > 2 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    {showAllReviews ? (
                      <>
                        <FiChevronUp className="mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="mr-1" />
                        Show All Reviews ({reviews.length - 2} more)
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-amber-400" size={24} />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                No Reviews Yet
              </h4>
              <p className="text-gray-500 mb-5 max-w-md mx-auto">
                Be the first to share your thoughts about this product!
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-6 rounded-lg font-medium shadow-sm transition-colors inline-flex items-center"
              >
                <FiStar className="mr-2" />
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductFAQ product={product} />
    </div>
  );
};

export default Product;
