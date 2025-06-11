import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const AnimatedStat = ({ value, label, suffix = "+" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white"> {/* Adjusted text size */}
        {start && <CountUp end={value} duration={2} suffix={suffix} />}
      </h2>
      <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white"> {/* Adjusted spacing and text size */}
        {label}
      </p>
    </motion.div>
  );
};

const Stat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate("/collection"); 
  };

  return (
    <section className="px-4 sm:px-0">
      {" "}
      {/* Added horizontal padding for mobile */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight text-green-700">
          {" "}
          {/* Responsive text sizes */}
          Naturally Radiant Skincare for Every You
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-700">
          {" "}
          {/* Adjusted spacing and text size */}
          Discover dermatologist-approved products made with nature's finest
          ingredients to nourish, heal, and enhance your skin's natural glow.
        </p>
        <div className="mt-4 sm:mt-8 flex justify-center gap-3 sm:gap-4 flex-wrap">
          {" "}
          {/* Adjusted spacing */}
          <button
            onClick={handleClick}
            className="border-2 border-green-600 text-green-600 px-4 py-2 sm:px-6 sm:py-3
              rounded-lg hover:bg-blue-50 transition text-sm sm:text-base"
          >
            See Products
          </button>
        </div>
      </div>
      <div className="mt-6 sm:mt-10 bg-gradient-to-r from-green-600 to-green-800 py-6 sm:py-10 px-4 sm:px-6">
        {" "}
        {/* Adjusted spacing */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <AnimatedStat value={500} label="Happy Customers" />
          <AnimatedStat value={98} label="Skin Satisfaction" suffix="%" />
          <AnimatedStat value={42} label="Natural Products" />
          <AnimatedStat value={3} label="Countries" />
        </div>
      </div>
    </section>
  );
};

export default Stat;