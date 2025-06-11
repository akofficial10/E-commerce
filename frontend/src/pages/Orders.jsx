import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders
          .flatMap((order) =>
            order.items.map((item) => ({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date || order.createdAt,
              orderId: order._id,
              fullOrder: order,
              trackingId: order.trackingId,
              courierPartner: order.courierPartner,
            }))
          )
          // .reverse();

        setOrderData(allOrdersItem);
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getTrackingInfo = async (orderId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/order/tracking-info/${orderId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        return response.data.trackingInfo;
      }
      return null;
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      return null;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadOrderData();
  };

  const toggleOrderExpand = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      const order = orderData.find((item) => item.orderId === orderId);
      if (order && order.trackingId) {
        const trackingInfo = await getTrackingInfo(orderId);
        if (trackingInfo) {
          setOrderData((prev) =>
            prev.map((item) =>
              item.orderId === orderId ? { ...item, ...trackingInfo } : item
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "packing":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "shipped":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const generateTrackingUrl = (courierName, trackingId) => {
    if (!courierName || !trackingId) return "#";

    const normalizedCourier = courierName.toLowerCase().replace(/\s+/g, "");

    const trackingUrls = {
      fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingId}`,
      ups: `https://www.ups.com/track?tracknum=${trackingId}`,
      dhl: `https://www.dhl.com/us-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${trackingId}`,
      usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingId}`,
      amazon: `https://www.amazon.com/progress-tracker/package/ref=pe_2640190_77699610_TE_typ?ie=UTF8&shipmentId=${trackingId}`,
    };

    return (
      trackingUrls[normalizedCourier] ||
      `https://www.google.com/search?q=${encodeURIComponent(
        `${courierName} tracking ${trackingId}`
      )}`
    );
  };

  const getCourierLogo = (courierName) => {
    if (!courierName) return null;

    const courierLogos = {
      fedex: "/logos/fedex.png",
      ups: "/logos/ups.png",
      dhl: "/logos/dhl.png",
      usps: "/logos/usps.png",
      amazon: "/logos/amazon.png",
    };

    const normalizedName = courierName.toLowerCase();
    const logoKey = Object.keys(courierLogos).find((key) =>
      normalizedName.includes(key)
    );

    return logoKey ? (
      <img
        src={courierLogos[logoKey]}
        alt={courierName}
        className="h-6 object-contain"
      />
    ) : (
      <span className="text-sm font-medium">{courierName}</span>
    );
  };

  const getStatusSteps = (status) => {
    const lowerStatus = status.toLowerCase();
    const steps = [
      { id: 1, name: "Order Placed", status: "complete" },
      {
        id: 2,
        name: "Packing",
        status: [
          "packing",
          "shipped",
          "out for delivery",
          "delivered",
        ].includes(lowerStatus)
          ? "complete"
          : "incomplete",
      },
      {
        id: 3,
        name: "Shipped",
        status: ["shipped", "out for delivery", "delivered"].includes(
          lowerStatus
        )
          ? "complete"
          : "incomplete",
      },
      {
        id: 4,
        name: "Out for Delivery",
        status: ["out for delivery", "delivered"].includes(lowerStatus)
          ? "complete"
          : "incomplete",
      },
      {
        id: 5,
        name: "Delivered",
        status: lowerStatus === "delivered" ? "complete" : "incomplete",
      },
    ];

    return lowerStatus === "cancelled"
      ? steps.map((step) => ({ ...step, status: "incomplete" }))
      : steps;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading your orders...
          </p>
          <p className="text-gray-500 mt-1">
            Please wait while we fetch your order history
          </p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Sign in to view orders
          </h3>
          <p className="text-gray-600 mb-6">
            Login to access your order history and tracking information
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In Now
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (orderData.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <Title text1={"My"} text2={"Orders"} />
              </h1>
              <p className="text-gray-500 mt-1">
                Your order history and tracking
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <svg
                className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't placed any orders. Start shopping to see your order
              history here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigate("/collection")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <Title text1={"My"} text2={"Orders"} />
            </h1>
            <p className="text-gray-500 mt-1">
              Your order history and tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <svg
                className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
            <button
              onClick={() => navigate("/collection")}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Shop Now</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {orderData.map((item, index) => (
            <motion.div
              key={`${item.orderId}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order #{item.orderId?.substring(0, 8)}...
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-gray-900">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOrderExpand(item.orderId)}
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 text-gray-500 transform transition-transform ${
                          expandedOrder === item.orderId ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === item.orderId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-start gap-5">
                            <div className="relative flex-shrink-0">
                              <img
                                className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                                src={
                                  item.image?.[0] ||
                                  "https://via.placeholder.com/96"
                                }
                                alt={item.name}
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/96";
                                }}
                              />
                              {item.quantity > 1 && (
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                                <span className="text-gray-900 font-medium">
                                  {currency}
                                  {item.price}
                                </span>
                                <span className="text-sm">
                                  Qty: {item.quantity}
                                </span>
                                <span className="text-sm">
                                  Subtotal: {currency}
                                  {(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    item.status
                                  )}`}
                                >
                                  <span className="capitalize">
                                    {item.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                          {item.trackingId ? (
                            <a
                              href={generateTrackingUrl(
                                item.courierPartner,
                                item.trackingId
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              Track Package
                            </a>
                          ) : (
                            <button
                              disabled
                              className="px-5 py-3 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              Tracking Not Available
                            </button>
                          )}

                          {/* {item.trackingId ? (
                            <a
                              href={generateTrackingUrl(
                                item.courierPartner,
                                item.trackingId
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                              Track Order
                            </a>
                          ) : (
                            <button
                              disabled
                              className="px-5 py-3 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              Tracking Not Available
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-4 text-lg">
                        Order Status
                      </h4>
                      <div className="relative">
                        <div
                          className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"
                          aria-hidden="true"
                        ></div>
                        <div className="relative flex justify-between">
                          {getStatusSteps(item.status).map((step) => (
                            <div
                              key={step.id}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                                  step.status === "complete"
                                    ? "bg-green-500 text-white shadow-md"
                                    : step.status === "current"
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-white border-2 border-gray-300 text-gray-400"
                                }`}
                              >
                                {step.status === "complete" ? (
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span className="text-xs font-medium">
                                    {step.id}
                                  </span>
                                )}
                              </div>
                              <span
                                className={`mt-2 text-xs font-medium ${
                                  step.status === "complete" ||
                                  step.status === "current"
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {step.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 text-lg">
                          Shipping Information
                        </h4>
                      </div>

                      {item.trackingId ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Tracking Number - Modified to have label and value in same row */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tracking Number
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="font-mono font-medium text-gray-800">
                                    {item.trackingId}
                                  </div>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        item.trackingId
                                      );
                                      toast.success(
                                        "Tracking number copied to clipboard"
                                      );
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Copy tracking number"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Courier - Modified to have label and value in same row */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Courier
                                </p>
                                <div>
                                  {item.courierPartner ? (
                                    <div className="flex items-center gap-2">
                                      {getCourierLogo(item.courierPartner)}
                                      <span className="text-gray-800">
                                        {item.courierPartner}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-gray-600">
                                      Not specified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Status - Modified to have label and value in same row */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </p>
                                <div>
                                  <span
                                    className={`capitalize font-medium ${getStatusColor(
                                      item.status
                                    )} px-3 py-1 rounded-full text-sm`}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mt-2">
                            Click "Track Package" to follow your shipment on the
                            courier's website.
                          </div>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <svg
                                className="h-5 w-5 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                <span className="font-medium">Processing:</span>{" "}
                                Tracking information will be available once your
                                order ships.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-medium text-gray-900 text-lg mb-4">
                            Payment Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-500">
                                Payment Method
                              </span>

                              <span className="font-medium capitalize">
                                {item.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Payment Status
                              </span>
                              <span
                                className={`font-medium capitalize ${
                                  item.payment
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.payment ? "Paid" : "Unpaid"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Total Amount
                              </span>
                              <span className="font-medium">
                                {currency}
                                {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Delivery Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Delivery Status
                              </span>
                              <span className="font-medium capitalize">
                                {item.status}
                              </span>
                            </div>
                            {item.fullOrder?.shippingAddress && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Delivery Address
                                  </span>
                                  <span className="font-medium text-right">
                                    {item.fullOrder.shippingAddress.address},{" "}
                                    {item.fullOrder.shippingAddress.city},{" "}
                                    {item.fullOrder.shippingAddress.country}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Contact</span>
                                  <span className="font-medium">
                                    {item.fullOrder.shippingAddress.phone}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
