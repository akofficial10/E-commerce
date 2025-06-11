import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [courierPartner, setCourierPartner] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        // toast.success(`Status updated to ${event.target.value}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleTrackingSubmit = async (orderId) => {
    try {
      if (!trackingId || !courierPartner) {
        toast.error("Please enter both tracking ID and courier partner");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/update-tracking`,
        {
          orderId,
          trackingId,
          courierPartner,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Tracking information updated successfully");

        // ✅ Re-fetch from backend to get updated tracking info
        await fetchAllOrders();

        // ✅ Reset fields
        setEditingOrderId(null);
        setTrackingId("");
        setCourierPartner("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };
  

  const startEditing = (order) => {
    setEditingOrderId(order._id);
    setTrackingId(order.trackingId || "");
    setCourierPartner(order.courierPartner || "");
  };

  const cancelEditing = () => {
    setEditingOrderId(null);
    setTrackingId("");
    setCourierPartner("");
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-blue-50 text-blue-600",
      Packing: "bg-purple-50 text-purple-600",
      Shipped: "bg-amber-50 text-amber-600",
      "Out for delivery": "bg-orange-50 text-orange-600",
      Delivered: "bg-green-50 text-green-600",
    };
    return colors[status] || "bg-gray-50 text-gray-600";
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
        className="h-13 object-contain max-w-[100px]"
      />
    ) : (
      <span className="text-sm font-medium">{courierName}</span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full h-12 w-12 bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 ">
        <div className="w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-32 h-32 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No Orders Yet
        </h3>
        <p className="text-gray-500 max-w-md text-center">
          When orders are placed, they will appear here with all the details you
          need to manage them.
        </p>
      </div>
    );
  }

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 ml-20">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage all customer orders in one place
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <svg
                className="-ml-1 mr-1.5 h-2 w-2 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx="4" cy="4" r="3" />
              </svg>
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div
                key={order._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {currency}
                        {order.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => toggleOrderExpand(order._id)}
                        className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
                      >
                        <svg
                          className={`h-5 w-5 transform ${
                            expandedOrder === order._id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {expandedOrder === order._id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Customer Information */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">
                            CUSTOMER
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">
                              {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address.phone}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address.street}
                              {order.address.city}, {order.address.state},{" "}
                              {order.address.zipcode}
                            </p>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">
                            ORDER DETAILS
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Payment Method
                              </span>
                              <span className="font-medium text-gray-900">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Payment Status
                              </span>
                              <span
                                className={`font-medium ${
                                  order.payment
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {order.payment ? "Paid" : "Pending"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Items</span>
                              <span className="font-medium text-gray-900">
                                {order.items.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Control */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">
                            UPDATE STATUS
                          </h4>
                          <select
                            onChange={(e) => statusHandler(e, order._id)}
                            value={order.status}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">
                              Out for delivery
                            </option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>

                      {/* Tracking Information */}
                      <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">
                          SHIPPING INFORMATION
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          {editingOrderId === order._id ? (
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="trackingId"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Tracking ID
                                </label>
                                <input
                                  type="text"
                                  id="trackingId"
                                  value={trackingId}
                                  onChange={(e) =>
                                    setTrackingId(e.target.value)
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  placeholder="Enter tracking ID"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="courierPartner"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Courier Partner
                                </label>
                                <select
                                  id="courierPartner"
                                  value={courierPartner}
                                  onChange={(e) =>
                                    setCourierPartner(e.target.value)
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  required
                                >
                                  <option value="">Select courier</option>
                                  <option value="FedEx">FedEx</option>
                                  <option value="UPS">UPS</option>
                                  <option value="DHL">DHL</option>
                                  <option value="USPS">USPS</option>
                                  <option value="Amazon Logistics">
                                    Amazon Logistics
                                  </option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() =>
                                    handleTrackingSubmit(order._id)
                                  }
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="space-y-2">
                                {order.trackingId ? (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-700">
                                        Tracking ID:
                                      </span>
                                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                        {order.trackingId}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-700">
                                        Courier:
                                      </span>
                                      {getCourierLogo(order.courierPartner)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-700">
                                        Status:
                                      </span>
                                      <span
                                        className={`text-sm ${getStatusColor(
                                          order.status
                                        )}`}
                                      >
                                        {order.status}
                                      </span>
                                    </div>
                                    <div className="mt-2">
                                      <a
                                        href={generateTrackingUrl(
                                          order.courierPartner,
                                          order.trackingId
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                                      >
                                        <svg
                                          className="w-4 h-4 mr-1"
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
                                        Track this package
                                      </a>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No tracking information added yet
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => startEditing(order)}
                                className="mt-3 md:mt-0 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                {order.trackingId
                                  ? "Update Tracking"
                                  : "Add Tracking"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">
                          ITEMS
                        </h4>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                          <ul className="divide-y divide-gray-200">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="px-4 py-3 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10 rounded"
                                        src={
                                          item.image?.[0] ||
                                          "https://via.placeholder.com/40"
                                        }
                                        alt={item.name}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {currency}
                                    {(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
