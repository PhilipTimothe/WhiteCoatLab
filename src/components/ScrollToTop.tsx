import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");

  // Show button when user scrolls 1/3 down the page and determine text color
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = window.innerHeight / 3; // 1/3 of viewport height
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > scrollThreshold) {
        setIsVisible(true);

        // Determine text color based on background
        // Check if we're in the narrative/featured works section (light background)
        const heroHeight = window.innerHeight;
        const narrativeHeight = window.innerHeight * 0.4;
        const transitionStart = heroHeight + narrativeHeight * 0.1;
        const transitionEnd = heroHeight + narrativeHeight * 0.6;

        if (
          currentScrollY >= transitionStart &&
          currentScrollY <= transitionEnd
        ) {
          // In transition zone - calculate progress
          const progress =
            (currentScrollY - transitionStart) /
            (transitionEnd - transitionStart);
          const lightness = Math.min(progress, 1);

          // Transition from white to black as background gets lighter
          if (lightness > 0.5) {
            setTextColor("#9CA3AF"); // Gray text on light background (matching scroll indicator)
          } else {
            setTextColor("#9CA3AF"); // Gray text (matching scroll indicator)
          }
        } else if (currentScrollY > transitionEnd) {
          // Past transition - light background
          setTextColor("#9CA3AF");
        } else {
          // Before transition - dark background
          setTextColor("#9CA3AF");
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    if (isScrolling) return; // Prevent multiple clicks during scroll

    setIsScrolling(true);

    const duration = 1200; // 1.2 seconds for smooth scroll
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentPosition = startPosition * (1 - easedProgress);
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`fixed bottom-8 right-8 z-50 flex flex-col items-center space-y-2 transition-all duration-300 group ${
            isScrolling
              ? "cursor-wait opacity-75"
              : "cursor-pointer hover:opacity-80"
          }`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Scroll back up to top"
        >
          {/* Icon with loading animation - positioned above text */}
          <motion.div
            animate={isScrolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: isScrolling ? 1.2 : 0.3,
              ease: isScrolling ? "linear" : [0.25, 0.46, 0.45, 0.94],
              repeat: isScrolling ? Infinity : 0,
            }}
          >
            <ChevronUp
              className={`h-4 w-4 transition-all duration-700 ease-out ${
                isScrolling ? "opacity-75" : "group-hover:-translate-y-0.5"
              }`}
              style={{ color: textColor }}
            />
          </motion.div>

          {/* Text - positioned below icon, matching scroll indicator style */}
          <span
            className="text-xs tracking-wider transition-colors duration-700 ease-out"
            style={{
              color: textColor,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            BACK UP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
