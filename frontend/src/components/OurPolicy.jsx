import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "100% Natural Botanical",
      description: "Pure plant-based ingredients",
      color: "from-emerald-100 to-emerald-50",
    },
    {
      icon: assets.quality_icon,
      title: "Chemical Free",
      description: "No synthetic additives",
      color: "from-blue-100 to-blue-50",
    },
    {
      icon: assets.support_img,
      title: "Cruelty Free",
      description: "Never tested on animals",
      color: "from-purple-100 to-purple-50",
    },
    {
      icon: assets.support_img,
      title: "Dermatologically Tested",
      description: "Safe for all skin types",
      color: "from-amber-100 to-amber-50",
    },
    {
      icon: assets.exchange_icon,
      title: "Recyclable Packaging",
      description: "Eco-friendly materials",
      color: "from-teal-100 to-teal-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="w-full py-12 md:py-16 relative overflow-hidden pt-5">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl"></div>

      <div className="px-4 sm:px-6 relative z-10">
        {/* Brand tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-light italic text-green-700 mb-4">
            Indulge In The <span className="font-semibold">Goodness</span> Of
            Non-Toxic Beauty
          </h2>
        </motion.div>

        {/* Policy items - All 5 in one row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${policy.color} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center border border-white/50 hover:border-white/80 relative overflow-hidden group min-w-[180px] max-w-[220px] flex-1`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-white p-3 md:p-4 rounded-full mb-3 md:mb-5 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={policy.icon}
                    className="w-6 h-6 md:w-8 md:h-8"
                    alt={policy.title}
                  />
                </div>
                <h3 className="font-bold text-green-800 text-sm md:text-lg mb-1 md:mb-2 relative z-10">
                  {policy.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm relative z-10">
                  {policy.description}
                </p>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-16 text-center max-w-7xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 md:gap-4 px-4 md:px-8 py-2 md:py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/80"
                ></div>
              ))}
            </div>
            <p className="text-green-700/90 text-xs md:text-sm font-medium tracking-wider md:tracking-widest uppercase">
              Certified Organic • Sustainable Practices • Vegan Formulations
            </p>
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/80"
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurPolicy;
