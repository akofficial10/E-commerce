import React, { useEffect } from "react";

const IngredientsPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 border-t">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Our Ingredients
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16 ">
        <div>
          <h2 className="text-2xl font-semibold mb-6">What We Include</h2>
          <ul className="space-y-4">
            {[
              "Hyaluronic Acid (Intense hydration)",
              "Niacinamide (Brightening & soothing)",
              "Vitamin C (Antioxidant protection)",
              "Plant Stem Cells (Anti-aging)",
              "Probiotics (Skin barrier support)",
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6">What We Exclude</h2>
          <ul className="space-y-4">
            {[
              "Parabens",
              "Sulfates (SLS/SLES)",
              "Synthetic Fragrances",
              "Phthalates",
              "Mineral Oil",
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  ✗
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Ingredient Sourcing</h2>
        <p className="text-gray-600 mb-6">
          We partner with ethical suppliers worldwide to obtain the purest forms
          of each ingredient. All raw materials undergo rigorous testing for
          potency and purity.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Organic farms in India",
            "Marine labs in Iceland",
            "Alpine herb cultivators",
          ].map((source, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">{source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
