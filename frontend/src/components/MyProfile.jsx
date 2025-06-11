import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    addresses: [],
    phone: "",
  });

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  // Fetch user data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.user);

          // Fetch orders if needed
          const ordersResponse = await axios.get(`${backendUrl}/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (ordersResponse.data.success) {
            setOrders(ordersResponse.data.orders);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch profile data", {
          position: "top-right",
          style: {
            background: "#ff4d4d",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          },
          icon: "❌",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          },
          icon: "✅",
          autoClose: 3000,
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed", {
        position: "top-right",
        style: {
          background: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
        },
        icon: "❌",
        autoClose: 3000,
      });
    }
  };

  const addAddress = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/address`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData((prev) => ({
          ...prev,
          addresses: [...prev.addresses, response.data.address],
        }));
        setNewAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          isDefault: false,
        });
        toast.success("Address added successfully!", {
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          },
          icon: "✅",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address", {
        position: "top-right",
        style: {
          background: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
        },
        icon: "❌",
        autoClose: 3000,
      });
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/address/default/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData((prev) => ({
          ...prev,
          addresses: prev.addresses.map((addr) => ({
            ...addr,
            isDefault: addr._id === addressId,
          })),
        }));
        toast.success("Default address updated!", {
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          },
          icon: "✅",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to update default address", {
        position: "top-right",
        style: {
          background: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
        },
        icon: "❌",
        autoClose: 3000,
      });
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData((prev) => ({
          ...prev,
          addresses: prev.addresses.filter((addr) => addr._id !== addressId),
        }));
        toast.success("Address deleted!", {
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          },
          icon: "✅",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete address", {
        position: "top-right",
        style: {
          background: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
        },
        icon: "❌",
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={userData.dob?.split("T")[0] || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Full Name
                  </h3>
                  <p className="text-lg font-semibold">{userData.name}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Email</h3>
                  <p className="text-lg font-semibold">{userData.email}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Date of Birth
                  </h3>
                  <p className="text-lg font-semibold">
                    {userData.dob
                      ? new Date(userData.dob).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Phone Number
                  </h3>
                  <p className="text-lg font-semibold">
                    {userData.phone || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Address Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">My Addresses</h2>
              <button
                onClick={() =>
                  document.getElementById("addAddressModal").showModal()
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Add New Address
              </button>
            </div>

            {userData.addresses.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No addresses saved yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`border rounded-lg p-4 ${
                      address.isDefault
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {address.isDefault && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">
                            Default
                          </span>
                        )}
                        {address.street}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setDefaultAddress(address._id)}
                          disabled={address.isDefault}
                          className={`text-xs ${
                            address.isDefault
                              ? "text-gray-400"
                              : "text-blue-500 hover:text-blue-700"
                          }`}
                        >
                          Set Default
                        </button>
                        <button
                          onClick={() => deleteAddress(address._id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Order ID</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Total</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="py-4 px-4">
                          #{order._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="py-4 px-4">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => navigate(`/orders/${order._id}`)}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <dialog id="addAddressModal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Add New Address</h3>
          <form method="dialog" className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={newAddress.zipCode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddressChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="defaultAddress"
              />
              <label
                htmlFor="defaultAddress"
                className="ml-2 block text-sm text-gray-700"
              >
                Set as default address
              </label>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("addAddressModal").close()
                }
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addAddress}
                className="btn bg-green-500 text-white hover:bg-green-600"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
