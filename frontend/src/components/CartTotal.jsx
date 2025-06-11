import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    products = [],
    currency = "₹",
    cartItems = {},
    delivery_fee = 0,
    free_delivery_threshold = 499, // Added free delivery threshold
  } = useContext(ShopContext) || {};

  // Memoize cart data transformation with product details
  const cartData = useMemo(() => {
    return Object.entries(cartItems)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p._id === productId);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean) // Remove any null entries
      .filter((item) => item.quantity > 0);
  }, [cartItems, products]);

  // Memoize calculations with enhanced logic
  const { subtotal, deliveryCharge, total, isFreeDelivery } = useMemo(() => {
    const subtotalValue = cartData.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );

    const freeDelivery = subtotalValue >= free_delivery_threshold;
    const deliveryChargeValue = freeDelivery ? 0 : delivery_fee;
    const totalValue = subtotalValue + deliveryChargeValue;

    return {
      subtotal: subtotalValue,
      deliveryCharge: deliveryChargeValue,
      total: totalValue,
      isFreeDelivery: freeDelivery,
    };
  }, [cartData, delivery_fee, free_delivery_threshold]);

  // Format currency with consistent decimal places
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculate savings if applicable
  const savings = useMemo(() => {
    return cartData.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  }, [cartData]);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>

      {/* Cart Items Preview */}
      {cartData.length > 0 && (
        <div className="mb-6 max-h-60 overflow-y-auto">
          <h3 className="font-medium text-gray-700 mb-3">Your Items</h3>
          <div className="space-y-3">
            {cartData.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    <span>
                      {currency} {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="text-xs text-green-600">
                      Saved: {currency}{" "}
                      {formatCurrency(
                        (item.originalPrice - item.price) * item.quantity
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="flex flex-col gap-4">
        {savings > 0 && (
          <div className="flex justify-between bg-green-50 p-2 rounded">
            <p className="text-green-700 font-medium">You Save</p>
            <p className="text-green-700 font-medium">
              {currency} {formatCurrency(savings)}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium text-gray-900">
            {currency} {formatCurrency(subtotal)}
          </p>
        </div>

        <hr className="border-gray-100" />

        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Fee</p>
          <p className="font-medium">
            {isFreeDelivery ? (
              <span className="text-green-500">FREE</span>
            ) : (
              `${currency} ${formatCurrency(deliveryCharge)}`
            )}
          </p>
        </div>

        {!isFreeDelivery && subtotal > 0 && (
          <div className="text-xs text-gray-500">
            Add {currency} {formatCurrency(free_delivery_threshold - subtotal)}{" "}
            more for free delivery
          </div>
        )}

        <hr className="border-gray-100" />

        <div className="flex justify-between items-center pt-2">
          <p className="font-bold text-gray-900">Total</p>
          <p className="text-lg font-bold text-gray-900">
            {currency} {formatCurrency(total)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
