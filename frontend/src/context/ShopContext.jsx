import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [showSearch, setShowSearch] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const [userCarts, setUserCarts] = useState(() => {
    try {
      const storedCarts = localStorage.getItem("userCarts");
      return storedCarts ? JSON.parse(storedCarts) : {};
    } catch (e) {
      console.error("Failed to parse user carts", e);
      return {};
    }
  });

  const fetchUserOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    }
  };

  const getTrackingInfo = async (orderId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/order/tracking-info/${orderId}`,
        { headers: { token } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      return { success: false, message: "Failed to fetch tracking info" };
    }
  };

  const updateOrderTracking = async (orderId, trackingData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/update-tracking`,
        {
          orderId,
          trackingId: trackingData.trackingId,
          courierPartner: trackingData.courierPartner,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        // Update local state immediately
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  trackingId: trackingData.trackingId,
                  courierPartner: trackingData.courierPartner,
                  status: "Shipped",
                }
              : order
          )
        );
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Error updating tracking:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update tracking",
      };
    }
  };

  const submitReview = async (reviewData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/reviews/${reviewData.productId}`,
        {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        config
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/reviews/${productId}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    if (token) {
      const userCart = userCarts[token] || {};
      setCartItems(userCart);
    } else {
      setCartItems({});
    }
  }, [token, userCarts]);

  useEffect(() => {
    localStorage.setItem("userCarts", JSON.stringify(userCarts));
  }, [userCarts]);

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      const storedCarts = JSON.parse(localStorage.getItem("userCarts") || "{}");
      const existingCart = storedCarts[newToken] || {};
      setCartItems(existingCart);
    } else {
      localStorage.removeItem("token");
      setCartItems({});
    }
    setToken(newToken);
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products || []);
        setAllProducts(response.data.products || []);
      } else {
        setError(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error fetching products"
      );
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserCart = (updatedCart) => {
    if (!token) return;
    setUserCarts((prev) => {
      const newUserCarts = {
        ...prev,
        [token]: updatedCart,
      };
      localStorage.setItem("userCarts", JSON.stringify(newUserCarts));
      return newUserCarts;
    });
    setCartItems(updatedCart);
  };

  const addToCart = async (itemId, quantity = 1) => {
    const currentQty = Math.max(0, Number(cartItems[itemId]) || 0);
    const newQty = Math.min(
      100,
      currentQty + Math.max(1, Number(quantity) || 1)
    );

    let updatedCart;
    if (newQty <= 0) {
      const { [itemId]: _, ...rest } = cartItems;
      updatedCart = rest;
    } else {
      updatedCart = {
        ...cartItems,
        [itemId]: newQty,
      };
    }

    updateUserCart(updatedCart);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, quantity: newQty },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    const { [itemId]: _, ...rest } = cartItems;
    updateUserCart(rest);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateCartItem = async (itemId, newQuantity) => {
    const qty = Number(newQuantity);
    if (isNaN(qty)) return;

    if (qty < 1) {
      removeFromCart(itemId);
    } else {
      const updatedCart = {
        ...cartItems,
        [itemId]: Math.min(100, qty),
      };
      updateUserCart(updatedCart);

      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/update",
            {
              itemId,
              quantity: qty,
            },
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
  };

  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success && response.data.cartData) {
        setCartItems(response.data.cartData);
        setUserCarts((prev) => ({
          ...prev,
          [token]: response.data.cartData,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const resetCart = async () => {
    if (token) {
      setUserCarts((prev) => {
        const { [token]: _, ...rest } = prev;
        localStorage.setItem("userCarts", JSON.stringify(rest));
        return rest;
      });
      setCartItems({});

      try {
        await axios.post(
          backendUrl + "/api/cart/reset",
          {},
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => {
      const quantity = Number(qty) || 0;
      return total + (quantity > 0 ? quantity : 0);
    }, 0);
  };

  const getCartTotal = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = allProducts.find((p) => p._id === itemId);
      const quantity = Number(cartItems[itemId]) || 0;
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return allProducts;
    const searchTerm = debouncedSearch.toLowerCase().trim();
    return allProducts.filter((product) => {
      if (!product) return false;
      return (
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product._id?.toLowerCase().includes(searchTerm)
      );
    });
  }, [debouncedSearch, allProducts]);

  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    getProductsData();
    if (token) {
      fetchUserOrders();
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
      fetchUserOrders();
    } else {
      setOrders([]);
    }
  }, [token]);

  const value = {
    products,
    allProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    setCartItems,
    resetCart,
    getCartCount,
    getCartTotal,
    currency: "₹",
    backendUrl,
    loading,
    error,
    refreshProducts: getProductsData,
    getProductById: (id) => allProducts.find((product) => product._id === id),
    setToken: handleSetToken,
    token,
    submitReview,
    fetchReviews,
    orders,
    fetchUserOrders,
    getTrackingInfo,
    updateOrderTracking,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
