import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 3 Must-have Skincare Products",
      description:
        "Discover the essential skincare products that should be in every Indian beauty routine",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "#",
      tag: "Trending",
      tagColor: "bg-blue-500",
    },
    {
      id: 2,
      title: "10 Best Skincare Brightening Products",
      description:
        "These products actually deliver on their brightening promises",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "#",
      tag: "Popular",
      tagColor: "bg-teal-500",
    },
    {
      id: 3,
      title: "Does the Hugely Popular Rice Line Really Work?",
      description:
        "We tested the viral product line to see if it lives up to the hype",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "#",
      tag: "Review",
      tagColor: "bg-green-500",
    },
    {
      id: 4,
      title: "More Beauty Insights Coming Soon",
      description: "Stay tuned for our latest discoveries and recommendations",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "#",
      tag: "Coming Soon",
      tagColor: "bg-blue-400",
    },
  ];

  const LazyImage = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className={`relative ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 animate-pulse rounded-t-2xl" />
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardHover = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageHover = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-green-300 mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase rounded-full bg-blue-100 mb-4">
            Skincare Journal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4">
            Expert{" "}
            <span className="text-transparent bg-clip-text bg-green-800">
              Beauty Insights
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Discover the latest trends, product reviews, and skincare science to
            elevate your routine
          </p>
        </motion.div>

        {/* Blog grid - Updated for 2 columns on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative flex flex-col h-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* Image container */}
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={imageHover.hover}
                  transition={imageHover.transition}
                  className="w-full h-full"
                >
                  <LazyImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-black/5 to-transparent"></div>
                <div
                  className={`absolute top-3 right-3 md:top-4 md:right-4 ${post.tagColor} text-white text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-md`}
                >
                  {post.tag}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 md:mb-4 flex-grow">
                  {post.description}
                </p>
                <div className="mt-auto">
                  <a
                    href={post.link}
                    className="inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read article
                    <FiArrowRight className="ml-1 md:ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#0e7490" }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 text-sm md:text-base"
          >
            Explore All Articles
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
