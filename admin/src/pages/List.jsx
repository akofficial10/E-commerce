import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
import { Trash2, Edit, Loader2, Image as ImageIcon } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      setDeletingId(id);
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 ml-30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <div className="text-sm text-gray-500">
          {list.length} {list.length === 1 ? "product" : "products"} found
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="col-span-1">Image</div>
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Skin Type</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-700">Product List</h3>
          </div>

          {/* Product List */}
          {list.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found. Add some products to see them here.
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
              >
                {/* Image - Desktop */}
                <div className="hidden md:block col-span-1">
                  {item.image[0] ? (
                    <img
                      className="w-12 h-12 rounded-md object-cover"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-3">
                    {/* Image - Mobile */}
                    <div className="md:hidden">
                      {item.image[0] ? (
                        <img
                          className="w-10 h-10 rounded-md object-cover"
                          src={item.image[0]}
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="md:hidden mt-1 flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {currency}
                          {item.price}
                        </span>
                        <span>•</span>
                        <span>{item.skinType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price - Desktop */}
                <div className="hidden md:flex items-center col-span-2">
                  <span className="text-gray-700">
                    {currency}
                    {item.price}
                  </span>
                </div>

                {/* Skin Type - Desktop */}
                <div className="hidden md:flex items-center col-span-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {item.skinType}
                  </span>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end items-center gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    disabled={deletingId === item._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                    title="Delete product"
                  >
                    {deletingId === item._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default List;
