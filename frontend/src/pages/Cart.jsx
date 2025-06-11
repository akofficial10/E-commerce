import React, { useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, removeFromCart, updateCartItem } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const cartData = useMemo(() => {
    if (!cartItems || typeof cartItems !== "object") return [];

    return Object.entries(cartItems)
      .map(([productId, quantity]) => ({ _id: productId, quantity }))
      .filter((item) => item.quantity > 0);
  }, [cartItems]);

  const cartTotal = useMemo(
    () =>
      cartData.reduce((total, item) => {
        const product = products?.find((p) => p._id === item._id);
        return total + (product?.price || 0) * item.quantity;
      }, 0),
    [cartData, products]
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on mount
  }, []);

  const handleRemoveItem = (productId) => {
    if (removeFromCart) {
      removeFromCart(productId);
    } else {
      console.error("removeFromCart function not found in ShopContext");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    if (updateCartItem) {
      updateCartItem(productId, newQuantity);
    } else {
      console.error("updateCartItem function not found in ShopContext");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfa] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-4xl leading-tight text-green-700">
          Your Cart
        </h1>

        {cartData.length === 0 ? (
          <div className="text-center bg-white py-16 px-6 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Oops! Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              {cartData.map((item) => {
                const product = products?.find((p) => p._id === item._id);
                if (!product) return null;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={product.image?.[0] || assets.placeholder}
                      alt={product.name}
                      className="w-full md:w-40 h-40 object-cover rounded-xl"
                    />

                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 mt-1">
                            {currency} {product.price?.toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <img
                            src={assets.bin_icon}
                            alt="Remove"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-4 py-1 text-lg hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x bg-gray-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="px-4 py-1 text-lg hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-lg font-medium text-gray-800">
                          {currency}{" "}
                          {(product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary and Button stacked */}
            <div className="space-y-6">
              <CartTotal />
              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition-all duration-300 font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
