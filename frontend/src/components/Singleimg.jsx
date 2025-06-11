import React from "react";
import abt6 from "../assets/abt6.png";
import { useNavigate } from "react-router-dom";

const Singleimg = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   window.scrollTo(0, 0);
  //   navigate("/collection");
  // };

  return (
    <div className="w-full h-[80vh] overflow-hidden relative group">
      {/* Main Image with Parallax and Glow Effect */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={abt6}
          alt="Niacinamide Skincare"
          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105 group-hover:rotate-0"
        />
        {/* Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Dynamic Overlay with Particle Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10 opacity-100 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/20 transition-all duration-700">
        {/* Floating Particles (CSS-only) */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 pointer-events-none"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              opacity: 0,
              transform: `scale(${Math.random() + 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Animated Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 tracking-tighter translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-100">
            Dermo Dazzle
          </h1>
        </div>

        <div className="overflow-hidden">
          <p className="text-white/90 text-lg md:text-xl max-w-lg mb-8 drop-shadow-md leading-relaxed translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-200">
            Dermodazzle's serum and sunscreen duo fades acne marks, tightens
            pores, and protects skin with SPF 50+ for a clear, radiant, and
            sun-safe glow.
          </p>
        </div>

        {/* <div className="overflow-hidden">
          <button
            onClick={handleClick}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-500 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl hover:shadow-2xl relative overflow-hidden"
            style={{ transitionDelay: "300ms" }}
          >
            <span className="relative z-10">SHOP NOW</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
          </button>
        </div> */}
      </div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 border-8 border-transparent group-hover:border-white/10 transition-all duration-1000 pointer-events-none"></div>

      {/* Custom CSS for animations */}
      {/* <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style> */}
    </div>
  );
};

export default Singleimg;
