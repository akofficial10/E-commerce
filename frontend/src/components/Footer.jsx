import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Stack columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8">
          {/* Brand Info - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-green-700 cursor-pointer">
              DERMODAZZLE
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              India's Premier Skincare Destination
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {[
                {
                  icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-pink-600",
                },
                {
                  icon: <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-blue-600",
                },
                {
                  icon: <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-sky-500",
                },
                {
                  icon: <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-red-600",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`bg-gray-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="w-full md:w-auto">
              <h4 className="text-sm sm:text-base text-green-700 font-medium mb-3 sm:mb-4">
                We Accept
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  "visa",
                  "mastercard",
                  
                  "paypal",
                  "upi",
                  "razorpay",
                ].map((method) => (
                  <div
                    key={method}
                    className="bg-gray-100 w-10 h-7 sm:w-12 sm:h-8 rounded flex items-center justify-center"
                  >
                    <img
                      src={`https://logo.clearbit.com/${method}.com`}
                      alt={method}
                      className="h-3 sm:h-4 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-green-700 uppercase mb-4 sm:mb-6 pb-2 border-b border-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Shop All",
                "New Arrivals",
                "Best Sellers",
                "Skincare Kits",
                "Gift Cards",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/collection"
                    className="text-sm sm:text-base text-gray-600 hover:text-green-700 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-green-700 uppercase mb-4 sm:mb-6 pb-2 border-b border-gray-200">
              Customer Care
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Contact Us",
                "FAQs",
                "Shipping & Returns",
                "Store Policy",
                "Payment Methods",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/contact"
                    className="text-sm sm:text-base text-gray-600 hover:text-green-700 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-green-700 uppercase mb-4 sm:mb-6 pb-2 border-b border-gray-200">
              Contact Us
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-sm sm:text-base text-gray-600 font-medium mb-1 sm:mb-2">
                  Customer Service
                </h4>
                <a
                  href="tel:+919876543210"
                  className="text-sm sm:text-base text-green-700 hover:text-green-800"
                >
                  +91 98765 43210
                </a>
              </div>

              <div>
                <h4 className="text-sm sm:text-base text-gray-600 font-medium mb-1 sm:mb-2">
                  Email Us
                </h4>
                <a
                  href="mailto:care@dermodazzle.in"
                  className="text-sm sm:text-base text-green-700 hover:text-green-800"
                >
                  care@dermodazzle.in
                </a>
              </div>

              <div>
                <h4 className="text-sm sm:text-base text-gray-600 font-medium mb-1 sm:mb-2">
                  Business Hours
                </h4>
                <p className="text-sm sm:text-base text-green-700">
                  Mon-Sat: 9:30 AM - 6:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Stack on mobile */}
        <div className="border-t  border-gray-200 py-2 sm:py-3 mb-6 sm:mb-8">
       
        </div>

        {/* Bottom Section - Stack on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            © 2025 DermoDazzle. All Rights Reserved
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Shipping Policy",
              "Refund Policy",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-xs sm:text-sm text-gray-500">
              Made in India
            </span>
            <span className="text-xl sm:text-2xl">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
