import React, { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { FiX } from "react-icons/fi";
import abt2 from "../assets/abt2.png";
import abt from "../assets/abt.png";
import result from "../assets/result.png";

const BeforeAfterSlider = ({ product }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState({
    before: null,
    after: null,
  });

  // Sample data - replace with your actual product images from props or API
  const defaultImages = {
    before: product.beforeImage || abt,
    after: product.afterImage || abt2,
    duration: product.resultsDuration || "4 weeks of use",
  };

  const handleImageUpload = (type, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImages((prev) => ({
        ...prev,
        [type]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="my-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Real Results</h3>

        {/* Slider Component */}
        <div className="relative rounded-lg overflow-hidden">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={result}
                alt="Before use"
                style={{ objectFit: "cover" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={result}
                alt="After use"
                style={{ objectFit: "cover" }}
              />
            }
            style={{ height: "450px", width: "100%" }}
            className={{
              background: "white",
              border: "2px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.16)",
            }}
          />

          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
              BEFORE
            </span>
            <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
              AFTER
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          {/* <p className="text-gray-600">
            Results after {defaultImages.duration} • {product.name}
          </p> */}
         
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Share Your Results</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <FiX className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Before Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("before", e.target.files[0])
                  }
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {selectedImages.before && (
                  <img
                    src={selectedImages.before}
                    alt="Preview before"
                    className="mt-2 h-24 object-cover rounded border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  After Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("after", e.target.files[0])
                  }
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {selectedImages.after && (
                  <img
                    src={selectedImages.after}
                    alt="Preview after"
                    className="mt-2 h-24 object-cover rounded border"
                  />
                )}
              </div>

              <button
                disabled={!selectedImages.before || !selectedImages.after}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Submit Your Results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BeforeAfterSlider;
