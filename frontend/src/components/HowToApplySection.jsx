import React from "react";
import { motion } from "framer-motion";

const HowToApplySection = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const steps = [
    {
      id: 1,
      title: "How to Apply Sunscreen",
      image:
        "https://images.unsplash.com/photo-1522108098940-de49801b5b40?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: [
        "Apply sunscreen as the last step of your morning routine",
        "Use about a nickel-sized amount for your face",
        "Dot sunscreen on your forehead, cheeks, nose, and chin",
        "Gently pat and spread evenly",
        "Reapply every 2 hours when exposed to sun",
      ],
      color: "from-amber-100 to-amber-50",
      button: "bg-amber-500 hover:bg-amber-600",
    },
    {
      id: 2,
      title: "How to Apply Face Serum",
      image:
        "https://plus.unsplash.com/premium_photo-1682096423780-41ca1b04af68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: [
        "Cleanse and tone your face before application",
        "Use 2-3 drops of serum for your entire face",
        "Warm the serum between your fingertips",
        "Gently press onto skin, don't rub aggressively",
        "Follow with moisturizer to lock in the serum",
      ],
      color: "from-purple-100 to-purple-50",
      button: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <section className="pb-5 md:pb-7 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-amber-600 bg-amber-100 rounded-full">
            SKINCARE ROUTINE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Your Skincare Application
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn the proper techniques to maximize the benefits of your
            skincare products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className={`relative group bg-gradient-to-br ${step.color} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="relative z-20 p-8 -mt-16">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${step.button
                        .replace("hover:", "")
                        .replace("bg-", "text-")} text-white font-bold mr-3`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>

                  <ol className="space-y-3 pl-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span
                          className={`flex-shrink-0 w-5 h-5 mt-0.5 mr-3 ${step.button
                            .replace("hover:", "")
                            .replace(
                              "bg-",
                              "text-"
                            )} rounded-full flex items-center justify-center`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ol>

                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
};

export default HowToApplySection;
