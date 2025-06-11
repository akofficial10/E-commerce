import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setSearch, getCartCount, token, setToken } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="flex flex-col sticky top-0 bg-white z-99">
      {/* Main Navbar */}
      <div className="flex items-center justify-between py-3 px-4 sm:px-0 font-medium relative h-[60px] sm:h-[70px]">
        <Link to="/">
          <img
            src={assets.logo}
            className="w-40 sm:w-50 sm:pl-10"
            alt="DermoDazzle"
          />
        </Link>

        <ul className="hidden sm:flex items-center space-x-8 text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "font-semibold border-b-1 border-gray-500"
                  : "hover:border-b-1 hover:border-gray-300"
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `${
                isActive
                  ? "font-semibold border-b-1 border-gray-500"
                  : "hover:border-b-1 hover:border-gray-300"
              }`
            }
          >
            SHOP
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "font-semibold border-b-1 border-gray-500"
                  : "hover:border-b-1 hover:border-gray-300"
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "font-semibold border-b-1 border-gray-500"
                  : "hover:border-b-1 hover:border-gray-300"
              }`
            }
          >
            CONTACT
          </NavLink>
        </ul>

        <div className="flex items-center gap-4 sm:gap-6 pr-2 sm:pr-6">
          {/* Mobile Search Icon - Hidden on desktop */}
          <div className="sm:hidden">
            <svg
              className="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShowSearch(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden sm:flex items-center w-120 h-10 mr-4 border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <div className="relative flex-grow">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full py-3 px-4 pl-11 text-sm focus:outline-none placeholder-gray-400 text-gray-700"
              />
              <svg
                className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 flex items-center gap-2 hover:opacity-90 transition-all duration-200 font-medium text-sm uppercase tracking-wide">
              <span>Search</span>
              <svg
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <img
              src={assets.cart_icon}
              className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity"
              alt="Cart"
            />
            <p className="absolute -right-2 -top-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-xs">
              {getCartCount()}
            </p>
          </Link>

          {/* Profile Dropdown */}
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 sm:w-6 cursor-pointer hover:opacity-80 transition-opacity"
              alt="Profile"
            />
            {token && (
              <div className="group-hover:block hidden absolute z-100 right-0 pt-6">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-700 rounded shadow-lg border border-gray-100">
                  {token ? (
                    <>
                      {/* <Link to={"/my-profile"}>
                        <p className="cursor-pointer hover:text-black">
                          My Profile
                        </p>
                      </Link> */}
                      <Link to={"/orders"}>
                        <p className="cursor-pointer hover:text-black">
                          Orders
                        </p>
                      </Link>
                      <p
                        onClick={logout}
                        className="cursor-pointer hover:text-black"
                      >
                        Logout
                      </p>
                    </>
                  ) : (
                    <Link to={"/login"}>
                      <p className="cursor-pointer hover:text-black">Login</p>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 sm:w-6 cursor-pointer sm:hidden hover:opacity-80 transition-opacity"
            alt="Menu"
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 overflow-hidden z-10 bg-white transition-all duration-300 ease-in-out ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 w-full sm:w-64 h-screen bg-white shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <img src={assets.logo} className="w-32  " alt="DermoDazzle" />
              <button
                onClick={() => setVisible(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2.5 px-4 pl-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <nav className="flex flex-col">
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 px-6 border-b ${
                    isActive
                      ? "text-black font-medium bg-gray-50"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 px-6 border-b ${
                    isActive
                      ? "text-black font-medium bg-gray-50"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
                to="/collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 px-6 border-b ${
                    isActive
                      ? "text-black font-medium bg-gray-50"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
                to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 px-6 border-b ${
                    isActive
                      ? "text-black font-medium bg-gray-50"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
                to="/contact"
              >
                CONTACT
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
