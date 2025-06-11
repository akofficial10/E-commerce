import React, { useState } from "react";

const FaqSection = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const faqs = [
    {
      question: "When should I apply serum in my skincare routine?",
      answer:
        "Face serum should be applied after cleansing and toning, but before moisturizer.",
    },
    {
      question: "Can I mix my serum with moisturizer?",
      answer:
        "While you can mix them, it's better to apply serum first, let it absorb for 30-60 seconds.",
    },
    {
      question: "How much sunscreen should I use on my face?",
      answer:
        "For adequate protection, use about 1/4 teaspoon for your face alone.",
    },
    {
      question: "Do I need sunscreen if my moisturizer has SPF?",
      answer:
        "While SPF moisturizers provide some protection, they're often not applied in sufficient quantities.",
    },
    {
      question: "Can I use serum both morning and night?",
      answer: "Yes, unless the product specifies otherwise.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      {/* ... rest of the FAQ section code ... */}
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Skincare FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 bg-white"
            >
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                  activeFaqIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    activeFaqIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeFaqIndex === index ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
