import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

// Scroll to top component - Updated to handle collection page
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-green-600">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Born from a passion for pure, effective skincare that celebrates
            your natural beauty
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-28">
        <div className="order-2 md:order-1 space-y-6">
          <div className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Our Origin
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            Where Nature Meets{" "}
            <span className="text-green-600">Dermatology</span>
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Founded in 2024, Dermodazzle Skin Care was born out of a passion
              to deliver effective and gentle skincare solutions rooted in both
              science and nature.
            </p>
            <p>
              What started as a focused effort to treat sensitive and
              problematic skin has grown into a trusted brand known for its
              research-backed, dermatologist-approved formulations.
            </p>
            <p>
              Today, Dermodazzle proudly empowers thousands of individuals
              across the globe with cruelty-free, results-driven skincare that
              enhances confidence and promotes long-term skin health.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl opacity-60 group-hover:opacity-80 transition-all duration-500 blur-xl"></div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-300">
            <img
              src="https://plus.unsplash.com/premium_photo-1677529496297-fd0174d65941?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our lab"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Commitments</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            These certifications represent our dedication to quality, safety,
            and ethical practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🏥",
              title: "FDA Approved",
              description:
                "Our products are FDA-approved after extensive research and are safe for external use",
            },
            {
              icon: "🔬",
              title: "Clinically Tested",
              description:
                "Our products are clinically tested by trusted dermatologists who deemed them safe and suitable for all skin types",
            },
            {
              icon: "🌱",
              title: "Sustainable Brand",
              description:
                "We are a sustainable brand with ethically sourced resources using only plant-based ingredients to reduce our carbon footprint",
            },
            {
              icon: "🐇",
              title: "Vegan & Cruelty-Free",
              description:
                "All our products are vegan, we use plant-derived ingredients and we are a PETA-certified cruelty-free brand",
            },
            {
              icon: "🤱",
              title: "Safe for Mothers",
              description:
                "Our products are made with carefully sourced ingredients, which makes them safe for mothers",
            },
            {
              icon: "🇮🇳",
              title: "Made in India",
              description:
                "All our ingredients and products are sourced and made in India",
            },
          ].map((cert, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="text-4xl mb-4 group-hover:text-green-600 transition-colors">
                {cert.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                {cert.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative mb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl -rotate-1 -z-10"></div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Three pillars that guide everything we create
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Clean Ingredients",
                desc: "No parabens, sulfates, or synthetic fragrances. Only what your skin truly needs.",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: "🔬",
                title: "Science-Backed",
                desc: "Formulated with dermatologists and tested for real results you can see and feel.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: "🌎",
                title: "Sustainable",
                desc: "Eco-friendly packaging & processes that respect our planet as much as your skin.",
                color: "text-teal-600",
                bg: "bg-teal-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl ${item.bg} hover:shadow-md transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`text-5xl mb-6 ${item.color}`}>{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to Subpages */}
      <section className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dive <span className="text-green-600">Deeper</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Explore what makes GlowSkin truly special
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Our Ingredients",
              desc: "Learn about our carefully selected components",
              link: "/about/ingredients",
              icon: "🧪",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              title: "Meet The Team",
              desc: "The experts behind our formulations",
              link: "/about/team",
              icon: "👩‍🔬",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              title: "Sustainability",
              desc: "Our eco-conscious practices",
              link: "/about/sustainability",
              icon: "♻️",
              color: "text-green-600",
              bg: "bg-green-50",
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => window.scrollTo(0, 0)}
              className={`${
                item.bg
              } rounded-xl p-8 hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-${item.color.replace(
                "text-",
                ""
              )}-200`}
            >
              <div
                className={`text-5xl mb-6 ${item.color} group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-green-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <div className="flex items-center font-medium text-green-600 group-hover:text-green-700 transition-colors">
                <span>Explore more</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gray-900 rounded-3xl p-12 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your{" "}
            <span className="text-green-400">Glow Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers with our
            dermatologist-approved skincare solutions.
          </p>
          <Link
            to="/collection"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            Discover Our Collection
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
