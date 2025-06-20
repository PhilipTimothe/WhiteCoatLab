import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
// import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import SplitTextReveal from "./components/SplitTextReveal";
import FeaturedWorks from "./components/FeaturedWorks";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [backgroundTransition, setBackgroundTransition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate transition based on scroll position - Start much earlier
      const heroHeight = window.innerHeight;
      const narrativeHeight = window.innerHeight * 0.4; // Reduced from full height
      const transitionStart = heroHeight + narrativeHeight * 0.1; // Start transition at 10% through narrative (much earlier)
      const transitionEnd = heroHeight + narrativeHeight * 0.6; // Complete by 60% through narrative

      if (
        currentScrollY >= transitionStart &&
        currentScrollY <= transitionEnd
      ) {
        const progress =
          (currentScrollY - transitionStart) /
          (transitionEnd - transitionStart);
        setBackgroundTransition(Math.min(progress, 1));
      } else if (currentScrollY > transitionEnd) {
        setBackgroundTransition(1);
      } else {
        setBackgroundTransition(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 500);

    const subtitleTimer = setTimeout(() => {
      setSubtitleVisible(true);
    }, 1200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  // Calculate dynamic colors based on transition progress
  const narrativeBackgroundColor = `rgb(${backgroundTransition * 255}, ${
    backgroundTransition * 255
  }, ${backgroundTransition * 255})`;
  const lineColor = backgroundTransition > 0.5 ? "#cccccc" : "#666666";
  const narrativeTextColor = backgroundTransition > 0.5 ? "#000000" : "#ffffff";
  const featuredBackgroundColor = `rgb(${backgroundTransition * 255}, ${
    backgroundTransition * 255
  }, ${backgroundTransition * 255})`;
  const featuredTextColor = backgroundTransition > 0.5 ? "#000000" : "#ffffff";

  return (
    <div className="bg-black/90 text-white relative">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <VideoBackground />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Navigation */}
        <Navigation theme="dark" />

        {/* Centered Logo */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="text-center max-w-full">
            {/* Logo and Subtitle Container - Both use same parallax speed */}
            <div
              className={`transition-all duration-1000 ease-out ${
                logoVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transform: `translateY(${logoVisible ? scrollY * 0.2 : 32}px)`,
              }}
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl leading-none"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 550,
                  letterSpacing: "0.07em",
                }}
              >
                WHITECOATLAB
              </h1>

              <div
                className={`transition-all duration-1000 ease-out ${
                  subtitleVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <p
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-widest text-white/90 mt-2"
                  style={{ letterSpacing: "0.3em" }}
                >
                  NEW YORK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-400 tracking-wider">SCROLL</span>
            <ChevronDown className="h-4 w-4 text-gray-400 animate-bounce" />
          </div>
        </div>

        {/* Vertical Tagline */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 hidden sm:block">
          <div className="flex flex-col">
            <div className="-rotate-90 origin-center py-1 leading-none">
              <span className="text-xs text-gray-400 tracking-widest whitespace-nowrap">
                CREATIVE PRODUCTION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section with Dynamic Background - Reduced Height */}
      <section
        className="relative overflow-hidden transition-colors duration-700 ease-out"
        style={{
          backgroundColor: narrativeBackgroundColor,
          height: "35vh", // Increased from 30vh to 50vh for better text positioning
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
              <div className="lg:col-start-2 lg:col-span-10">
                <div
                  className="space-y-4"
                  style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                >
                  <div className="space-y-2">
                    <SplitTextReveal
                      text="We craft stories that move people — remarkable,"
                      className="text-sm sm:text-1xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-colors duration-700 ease-out"
                      delay={0}
                      textColor={narrativeTextColor}
                    />
                    <SplitTextReveal
                      text="and emotionally unforgettable narratives that"
                      className="text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-colors duration-700 ease-out"
                      delay={0.1}
                      textColor={narrativeTextColor}
                    />
                    <SplitTextReveal
                      text="live far beyond the frame."
                      className="text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-colors duration-700 ease-out"
                      delay={0.2}
                      textColor={narrativeTextColor}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-6 sm:w-10 h-px transition-colors duration-700 ease-out"
                      style={{ backgroundColor: lineColor }}
                    ></div>
                    <span
                      className="text-[9px] sm:text-xs tracking-widest font-medium transition-colors duration-700 ease-out"
                      style={{
                        color:
                          backgroundTransition > 0.1 ? "#666666" : "#9CA3AF",
                      }}
                    >
                      STORYTELLING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section with Dynamic Background */}
      <FeaturedWorks
        backgroundColor={featuredBackgroundColor}
        textColor={featuredTextColor}
        transitionProgress={backgroundTransition}
      />

      {/* Footer - White Background */}
      <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-800 mb-4">
              © 2025 WHITECOATLAB
            </p>
            <p className="text-xs text-gray-600">NEW YORK</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
