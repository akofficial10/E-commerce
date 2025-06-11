import { motion } from "framer-motion";
import {
  FaLeaf,
  FaFlask,
  FaRegClock,
  FaRegLightbulb,
  FaRegGem,
  FaWater,
  FaSun,
} from "react-icons/fa";
import { GiDrop, GiSpray } from "react-icons/gi";
import { RiTestTubeLine } from "react-icons/ri";

const ProductDetails = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mt-24 w-full"
    >
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Transform Your Skin Naturally
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 max-w-4xl mx-auto"
          >
            Our advanced formula combines science and nature to deliver visible
            results in just 14 days.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <FaLeaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Key Benefits
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <GiDrop className="w-5 h-5" />,
                    text: "Deep Hydration",
                    color: "text-blue-500",
                  },
                  {
                    icon: <FaSun className="w-5 h-5" />,
                    text: "UV Protection",
                    color: "text-yellow-500",
                  },
                  {
                    icon: <FaRegGem className="w-5 h-5" />,
                    text: "Brightening",
                    color: "text-purple-500",
                  },
                  {
                    icon: <GiSpray className="w-5 h-5" />,
                    text: "Anti-Aging",
                    color: "text-pink-500",
                  },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-white hover:to-gray-50 transition-all"
                  >
                    <span className={`${benefit.color} mr-2`}>
                      {benefit.icon}
                    </span>
                    <span className="text-gray-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ingredients Spotlight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <RiTestTubeLine className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Active Ingredients
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Hyaluronic Acid",
                    desc: "Retains 1000x its weight in water for intense hydration",
                    strength: "2%",
                  },
                  {
                    name: "Vitamin C",
                    desc: "Brightens skin and reduces hyperpigmentation",
                    strength: "10%",
                  },
                  {
                    name: "Niacinamide",
                    desc: "Strengthens skin barrier and reduces redness",
                    strength: "5%",
                  },
                  {
                    name: "Peptides",
                    desc: "Stimulates collagen production for firmer skin",
                    strength: "3%",
                  },
                ].map((ingredient, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {ingredient.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {ingredient.desc}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {ingredient.strength}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skin Type Compatibility */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-xl mr-4">
                  <FaFlask className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Skin Type Compatibility
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { type: "Dry", color: "bg-blue-100 text-blue-800" },
                  { type: "Oily", color: "bg-green-100 text-green-800" },
                  {
                    type: "Combination",
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  { type: "Sensitive", color: "bg-red-100 text-red-800" },
                  { type: "Normal", color: "bg-gray-100 text-gray-800" },
                  { type: "Acne-Prone", color: "bg-teal-100 text-teal-800" },
                ].map((skinType, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    viewport={{ once: true }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${skinType.color}`}
                  >
                    {skinType.type}
                  </motion.span>
                ))}
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                *Formulated without common irritants like parabens, sulfates, or
                synthetic fragrances
              </p>
              <p className="mt-4 text-gray-600 text-sm">
                *Formulated without common irritants like parabens, sulfates, or
                synthetic fragrances
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* How To Use */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-pink-100 p-3 rounded-xl mr-4">
                  <FaRegClock className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  How To Use
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: "Morning Routine",
                    details: [
                      "Cleanse with lukewarm water",
                      "Apply toner (optional)",
                      "Dispense 2-3 drops",
                      "Gently press onto face and neck",
                      "Follow with moisturizer and SPF",
                    ],
                  },
                  {
                    step: "Evening Routine",
                    details: [
                      "Double cleanse to remove impurities",
                      "Apply toner (optional)",
                      "Use 3-4 drops for overnight repair",
                      "Massage gently in upward motions",
                      "Finish with night cream",
                    ],
                  },
                ].map((routine, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">
                      {routine.step}
                    </h4>
                    <ol className="space-y-2 pl-2">
                      {routine.details.map((detail, j) => (
                        <li key={j} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 mr-2"></span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Results Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                  <FaRegLightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Expected Results Timeline
                </h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    time: "1-3 days",
                    result: "Immediate hydration boost, skin feels smoother",
                  },
                  { time: "1 week", result: "Visible glow, reduced tightness" },
                  { time: "2 weeks", result: "Improved texture, even tone" },
                  {
                    time: "4 weeks",
                    result: "Reduced fine lines, brighter complexion",
                  },
                  {
                    time: "8 weeks",
                    result: "Optimal results, collagen improvement",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <div className="flex-shrink-0 mt-1 mr-4 relative">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
                      {i < 4 && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-0.5 h-8 bg-gray-200"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.time}</p>
                      <p className="text-gray-600">{item.result}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sustainability Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-3xl border border-green-100"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <div className="bg-white p-5 rounded-2xl shadow-md">
                <FaLeaf className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <div className="md:w-full md:pl-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Clean & Sustainable Beauty
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Cruelty-free",
                  "Vegan formula",
                  "Recyclable packaging",
                  "Carbon neutral",
                  "No parabens",
                  "No sulfates",
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductDetails;
