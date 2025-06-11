import React from "react";

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            SKINCARE SCIENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Skin Routine
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clinically-proven ingredients that deliver visible results for all
            skin types
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Benefit 1 - Dark Circles */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ">
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Bright eyes"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Dark Circle Correction
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our vitamin C and caffeine blend reduces dark circles and
                puffiness for brighter, more awake-looking eyes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Vitamin C
                </span>
                <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Caffeine
                </span>
                <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Hyaluronic Acid
                </span>
                <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Hyaluronic Acid
                </span>
              </div>
            </div>
          </div>

          {/* Benefit 2 - Anti-Aging */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ">
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Anti-aging"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Advanced Anti-Aging
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Retinol and peptides stimulate collagen production to reduce
                fine lines and improve skin elasticity.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                  Retinol
                </span>
                <span className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                  Peptides
                </span>
                <span className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                  Niacinamide
                </span>
                <span className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                  Niacinamide
                </span>
              </div>
            </div>
          </div>

          {/* Benefit 3 - Hydration */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Hydration"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Deep Hydration
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hyaluronic acid and ceramides create a moisture barrier that
                lasts 72 hours for plump, dewy skin.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full">
                  Hyaluronic Acid
                </span>
                <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full">
                  Ceramides
                </span>
                <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full">
                  Snail Mucin
                </span>
                <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full">
                  Snail Mucin
                </span>
              </div>
            </div>
          </div>

          {/* Benefit 4 - Brightening */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Brightening"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Skin Brightening
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Alpha arbutin and vitamin C work synergistically to fade
                hyperpigmentation and even skin tone.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                  Vitamin C
                </span>
                <span className="text-xs px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                  Alpha Arbutin
                </span>
                <span className="text-xs px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                  Licorice Root
                </span>
                <span className="text-xs px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                  Licorice Root
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Skincare Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">97%</div>
            <div className="text-gray-600">
              Users saw reduced fine lines in 4 weeks
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-purple-600 mb-2">24H</div>
            <div className="text-gray-600">Long-lasting hydration</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Dermatologist tested</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-yellow-600 mb-2">2M+</div>
            <div className="text-gray-600">Happy customers worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
