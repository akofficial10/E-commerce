import React, { useEffect } from "react";

const SustainabilityPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 border-t">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Our Sustainability Promise
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Eco-Conscious Packaging
          </h2>
          <ul className="space-y-4">
            {[
              "100% recyclable glass bottles",
              "Plant-based ink printing",
              "Minimal secondary packaging",
              "Biodegradable shipping materials",
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                  ♻️
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-400">
          <img
            src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="" className="rounded-xl"
          />
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Our Carbon Footprint
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { value: "72%", label: "Reduction in plastic use since 2020" },
            { value: "100%", label: "Renewable energy in our labs" },
            { value: "1:1", label: "Carbon offset for all shipments" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Future Goals</h2>
        <div className="space-y-6">
          {[
            "Achieve zero-waste manufacturing by 2025",
            "Develop waterless product formulations",
            "Launch refill station program",
          ].map((goal, i) => (
            <div
              key={i}
              className="flex items-start border-b border-gray-100 pb-6"
            >
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-gray-700">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
