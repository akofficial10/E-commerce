import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const AnnouncementBar = () => {
  const typedRef = useRef(null);
  const typedInstanceRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Skip if already initialized (for Strict Mode)
    if (initializedRef.current) return;

    // Initialize only when ref is available
    if (typedRef.current && !typedInstanceRef.current) {
      const options = {
        strings: [
          "We ship worldwide - Fast and reliable shipping!",
          "Free shipping on orders over ₹499!",
          "30-day money back guarantee!",
          "24/7 Customer support available!",
        ],
        typeSpeed: 50,
        backSpeed: 20,
        backDelay: 2000,
        loop: true,
        showCursor: false,
      };

      typedInstanceRef.current = new Typed(typedRef.current, options);
      initializedRef.current = true;
    }

    // Enhanced cleanup
    return () => {
      if (typedInstanceRef.current) {
        try {
          typedInstanceRef.current.destroy();
          // Clear any remaining text
          if (typedRef.current) {
            typedRef.current.textContent = "";
          }
        } catch (e) {
          console.warn("Typed.js cleanup error:", e);
        }
        typedInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #22c55e, #16a34a)",
        color: "white",
        textAlign: "center",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        minHeight: "40px",
      }}
    >
      <span
        ref={typedRef}
        style={{
          display: "inline-block",
          minHeight: "20px", // Prevents layout shift
        }}
      />
    </div>
  );
};

export default AnnouncementBar;
