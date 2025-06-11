import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[250px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg transition-all duration-300 ease-in-out fixed">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 mt-4 px-3 flex items-center">
          Admin Panel
        </h2>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`
          }
          to="/add"
        >
          <div
            className={`p-2 rounded-lg ${
              window.location.pathname === "/add" ? "bg-white" : "bg-blue-100"
            }`}
          >
            <img className="w-5 h-5" src={assets.add_icon} alt="Add items" />
          </div>
          <p className="font-medium">Add items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`
          }
          to="/list"
        >
          <div
            className={`p-2 rounded-lg ${
              window.location.pathname === "/list"
                ? "bg-green-700"
                : "bg-blue-100"
            }`}
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="List items" />
          </div>
          <p className="font-medium">List items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`
          }
          to="/orders"
        >
          <div
            className={`p-2 rounded-lg ${
              window.location.pathname === "/orders"
                ? "bg-blue-700"
                : "bg-blue-100"
            }`}
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          </div>
          <p className="font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
