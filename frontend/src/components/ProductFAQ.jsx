import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaRegSmile,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";
import { GiDrop, GiSpray } from "react-icons/gi";
import { RiTestTubeLine } from "react-icons/ri";

const ProductFAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = {
    all: [
      {
        question: "How often should I use this product?",
        answer:
          "For optimal results, we recommend using the serum once daily, preferably in the morning. Those with sensitive skin may want to start with every other day and gradually increase frequency.",
        icon: <GiDrop className="w-5 h-5 text-blue-500" />,
        category: "usage",
      },
      {
        question: "Can I use this with other skincare products?",
        answer:
          "Yes, this serum pairs well with most skincare products. For best results, apply after cleansing and toning, but before moisturizing. Avoid using with products containing high concentrations of retinol or acids unless directed by a dermatologist.",
        icon: <RiTestTubeLine className="w-5 h-5 text-purple-500" />,
        category: "combinations",
      },
      {
        question: "How long until I see results?",
        answer:
          "Most users notice improved skin texture within 1-2 weeks of regular use. Visible brightening and reduction in fine lines typically appear after 4-6 weeks of consistent application.",
        icon: <FaRegSmile className="w-5 h-5 text-yellow-500" />,
        category: "results",
      },
      {
        question: "Is this product cruelty-free?",
        answer:
          "Yes, all DermoDazzle products are cruelty-free and never tested on animals. We are proud to be certified by PETA and Leaping Bunny.",
        icon: <FaLeaf className="w-5 h-5 text-green-500" />,
        category: "ethics",
      },
      {
        question: "What's your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you may return it within 30 days for a full refund. Opened products are eligible for return if at least 50% of the product remains.",
        icon: <FaShieldAlt className="w-5 h-5 text-red-500" />,
        category: "shipping",
      },
      {
        question: "Does this product contain fragrance?",
        answer:
          "No, our serum is completely fragrance-free, including both synthetic and natural fragrances. We've formulated it to be suitable for even the most sensitive skin types.",
        icon: <GiSpray className="w-5 h-5 text-pink-500" />,
        category: "ingredients",
      },
      {
        question: "How should I store this product?",
        answer:
          "For maximum potency, store in a cool, dry place away from direct sunlight. The bathroom isn't ideal due to humidity fluctuations. The product is stable at room temperature for 12 months after opening.",
        icon: <FaShippingFast className="w-5 h-5 text-indigo-500" />,
        category: "storage",
      },
      {
        question: "Is this suitable for acne-prone skin?",
        answer:
          "Yes, our formula is non-comedogenic and specifically designed not to clog pores. The niacinamide in our formula actually helps regulate oil production and reduce breakouts over time.",
        icon: <RiTestTubeLine className="w-5 h-5 text-teal-500" />,
        category: "skin-types",
      },
    ],
    usage: [
      {
        question: "How often should I use this product?",
        answer:
          "For optimal results, we recommend using the serum once daily, preferably in the morning. Those with sensitive skin may want to start with every other day and gradually increase frequency.",
        icon: <GiDrop className="w-5 h-5 text-blue-500" />,
        category: "usage",
      },
      {
        question: "Should I apply before or after moisturizer?",
        answer:
          "Apply the serum after cleansing and toning, but before your moisturizer. This allows the active ingredients to penetrate effectively. Wait 1-2 minutes before applying moisturizer for best absorption.",
        icon: <GiDrop className="w-5 h-5 text-blue-500" />,
        category: "usage",
      },
    ],
    ingredients: [
      {
        question: "Does this product contain fragrance?",
        answer:
          "No, our serum is completely fragrance-free, including both synthetic and natural fragrances. We've formulated it to be suitable for even the most sensitive skin types.",
        icon: <GiSpray className="w-5 h-5 text-pink-500" />,
        category: "ingredients",
      },
      {
        question: "Are the ingredients organic?",
        answer:
          "While not all ingredients are certified organic, we use 100% naturally-derived active ingredients and prioritize organic sources whenever possible. All ingredients are carefully screened for purity and efficacy.",
        icon: <GiSpray className="w-5 h-5 text-pink-500" />,
        category: "ingredients",
      },
    ],
    results: [
      {
        question: "How long until I see results?",
        answer:
          "Most users notice improved skin texture within 1-2 weeks of regular use. Visible brightening and reduction in fine lines typically appear after 4-6 weeks of consistent application.",
        icon: <FaRegSmile className="w-5 h-5 text-yellow-500" />,
        category: "results",
      },
      {
        question: "What results can I expect?",
        answer:
          "Clinical studies show 92% of users experienced brighter complexion, 87% saw reduced fine lines, 95% reported improved hydration, and 89% noticed softer skin after 8 weeks of daily use.",
        icon: <FaRegSmile className="w-5 h-5 text-yellow-500" />,
        category: "results",
      },
    ],
    "skin-types": [
      {
        question: "Is this suitable for acne-prone skin?",
        answer:
          "Yes, our formula is non-comedogenic and specifically designed not to clog pores. The niacinamide in our formula actually helps regulate oil production and reduce breakouts over time.",
        icon: <RiTestTubeLine className="w-5 h-5 text-teal-500" />,
        category: "skin-types",
      },
      {
        question: "Can sensitive skin use this product?",
        answer:
          "Absolutely. Our formula is fragrance-free and designed for all skin types, including sensitive skin. We recommend doing a patch test behind the ear before first full application.",
        icon: <RiTestTubeLine className="w-5 h-5 text-teal-500" />,
        category: "skin-types",
      },
    ],
    ethics: [
      {
        question: "Is this product cruelty-free?",
        answer:
          "Yes, all DermoDazzle products are cruelty-free and never tested on animals. We are proud to be certified by PETA and Leaping Bunny.",
        icon: <FaLeaf className="w-5 h-5 text-green-500" />,
        category: "ethics",
      },
      {
        question: "Is your packaging sustainable?",
        answer:
          "We use 100% recyclable materials and our outer packaging is made from 80% post-consumer recycled paper. Our bottles are made from recycled glass whenever possible.",
        icon: <FaLeaf className="w-5 h-5 text-green-500" />,
        category: "ethics",
      },
    ],
  };

  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: <FaShieldAlt className="w-4 h-4" />,
    },
    { id: "usage", name: "Usage", icon: <GiDrop className="w-4 h-4" /> },
    {
      id: "ingredients",
      name: "Ingredients",
      icon: <RiTestTubeLine className="w-4 h-4" />,
    },
    {
      id: "results",
      name: "Results",
      icon: <FaRegSmile className="w-4 h-4" />,
    },
    {
      id: "skin-types",
      name: "Skin Types",
      icon: <GiSpray className="w-4 h-4" />,
    },
    { id: "ethics", name: "Ethics", icon: <FaLeaf className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-16 w-full"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200/50">
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                Your Skincare Questions Answered
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to know about our products and your skincare
              journey
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setExpandedFaq(null); // Reset expanded FAQ when changing category
                }}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence>
              {faqData[activeCategory]?.map((faq, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  layout // Add layout animation for smooth reordering
                >
                  <div
                    className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${
                      expandedFaq === index
                        ? "bg-white shadow-md"
                        : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <button
                      className="flex items-center justify-between w-full p-6 text-left focus:outline-none group"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-0.5">
                          <div
                            className={`p-2 rounded-lg ${
                              expandedFaq === index
                                ? "bg-gradient-to-r from-green-100 to-green-200"
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}
                          >
                            {faq.icon}
                          </div>
                        </div>
                        <h3
                          className={`text-lg font-medium ${
                            expandedFaq === index
                              ? "text-gray-900"
                              : "text-gray-800"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      <svg
                        className={`w-5 h-5 ${
                          expandedFaq === index
                            ? "text-green-600"
                            : "text-gray-500"
                        } transition-transform duration-200 ${
                          expandedFaq === index ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                              opacity: { duration: 0.2 },
                              height: { duration: 0.3 },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              opacity: { duration: 0.1 },
                              height: { duration: 0.2 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 text-gray-600">
                            <div className="pl-12 border-l-2 border-green-100">
                              <p>{faq.answer}</p>
                              {index % 2 === 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-700 flex items-start"
                                >
                                  <svg
                                    className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    Pro Tip:{" "}
                                    {
                                      [
                                        "Apply to slightly damp skin for better absorption",
                                        "Store in a cool place away from sunlight",
                                        "Use sunscreen daily as this product increases sun sensitivity",
                                      ][index % 3]
                                    }
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFAQ;
