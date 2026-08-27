import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import SplitTextReveal from "./components/SplitTextReveal";
import FeaturedWorks from "./components/FeaturedWorks";
import TrustBar from "./components/TrustBar";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import { useBackgroundColor } from "./hooks/useBackgroundColor";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [backgroundTransition, setBackgroundTransition] = useState(0);

  // Define background sections for dynamic color changes
  const backgroundSections = [
    { element: ".hero-section", color: "#000000" }, // Black for hero
    { element: ".narrative-section", color: "#000000", threshold: 0.2 }, // Start transition earlier
    { element: ".featured-works-section", color: "#ffffff", threshold: 0.3 }, // White for featured works
    { element: ".footer-section", color: "#ffffff" }, // White for footer
  ];

  // Use the dynamic background hook
  useBackgroundColor(backgroundSections);

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
  const featuredSecondaryColor =
    backgroundTransition > 0.5 ? "#666666" : "#9CA3AF";
  const featuredBorderColor =
    backgroundTransition > 0.5 ? "#e5e5e5" : "#444444";

  return (
    <div className="bg-black/90 text-white relative">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden hero-section">
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
                <p className="text-xs sm:text-sm max-w-xl mx-auto font-thin text-white/70 mt-4">
                  For businesses with a real marketing need and no clear
                  roadmap. We build the clarity, shape the direction, then make
                  the work that delivers on it.
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
                MARKETING STUDIO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section with Dynamic Background - Reduced Height */}
      <section
        className="relative overflow-hidden transition-colors duration-700 ease-out narrative-section"
        style={{
          backgroundColor: narrativeBackgroundColor,
          height: "35vh",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
              <div className="lg:col-start-2 lg:col-span-10">
                <div
                  className="space-y-4"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  <div className="space-y-2">
                    <SplitTextReveal
                      text="We become the marketing function your"
                      className="text-sm sm:text-1xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-colors duration-700 ease-out"
                      delay={0}
                      textColor={narrativeTextColor}
                    />
                    <SplitTextReveal
                      text="business doesn't have. We set the direction,"
                      className="text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-colors duration-700 ease-out"
                      delay={0.1}
                      textColor={narrativeTextColor}
                    />
                    <SplitTextReveal
                      text="then produce the work it calls for."
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
                      MARKETING STUDIO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section with Dynamic Background */}
      <div
        className="featured-works-section transition-colors duration-700 ease-out"
        style={{ backgroundColor: featuredBackgroundColor }}
      >
        {/* Three-Layer Teaser */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h3
                  className="text-lg sm:text-xl mb-2 transition-colors duration-700 ease-out"
                  style={{ color: featuredTextColor }}
                >
                  Discovery
                </h3>
                <p
                  className="text-sm font-thin leading-relaxed transition-colors duration-700 ease-out"
                  style={{ color: featuredSecondaryColor }}
                >
                  Before anything gets made, we work to understand your goals,
                  your brand, and your market, then define what the work should
                  be.
                </p>
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl mb-2 transition-colors duration-700 ease-out"
                  style={{ color: featuredTextColor }}
                >
                  Strategy
                </h3>
                <p
                  className="text-sm font-thin leading-relaxed transition-colors duration-700 ease-out"
                  style={{ color: featuredSecondaryColor }}
                >
                  Out of discovery comes the direction, and that is the thing
                  everything else serves. This is what you are actually hiring.
                </p>
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl mb-2 transition-colors duration-700 ease-out"
                  style={{ color: featuredTextColor }}
                >
                  Production
                </h3>
                <p
                  className="text-sm font-thin leading-relaxed transition-colors duration-700 ease-out"
                  style={{ color: featuredSecondaryColor }}
                >
                  Photography, video, and digital work, produced in service of
                  the strategy above it.
                </p>
              </div>
            </div>
            <Link
              to="/approach"
              className="inline-block mt-8 text-xs tracking-widest font-medium border-b pb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-700 ease-out"
              style={{
                color: featuredTextColor,
                borderColor: featuredTextColor,
              }}
            >
              SEE OUR APPROACH
            </Link>
          </div>
        </section>

        {/* Darby Flagship Card */}
        <section
          className="py-12 sm:py-16 md:py-20 border-t transition-colors duration-700 ease-out"
          style={{ borderColor: featuredBorderColor }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/work" className="group block">
              <span
                className="text-xs tracking-widest font-medium transition-colors duration-700 ease-out block"
                style={{ color: featuredSecondaryColor }}
              >
                FEATURED CASE STUDY
              </span>
              <div className="inline-block bg-white rounded-md px-8 py-6 mt-6 mb-2 shadow-lg">
                <img
                  src="/darbylogo.png"
                  alt="Darby Construction Services"
                  className="h-48 sm:h-64 w-auto"
                />
              </div>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 group-hover:text-blue-500 transition-colors duration-700 ease-out"
                style={{ color: featuredTextColor }}
              >
                The function Darby didn't have.
              </h3>
              <p
                className="text-sm sm:text-base font-thin max-w-2xl mb-4 transition-colors duration-700 ease-out"
                style={{ color: featuredSecondaryColor }}
              >
                Two years, 29 projects, and more than fourteen active sites. See
                how a recurring need became a dependable program.
              </p>
              <span
                className="inline-block text-xs tracking-widest font-medium border-b pb-1 group-hover:text-blue-500 group-hover:border-blue-500 transition-colors duration-700 ease-out"
                style={{
                  color: featuredTextColor,
                  borderColor: featuredTextColor,
                }}
              >
                READ THE CASE STUDY
              </span>
            </Link>
          </div>
        </section>

        <FeaturedWorks
          backgroundColor={featuredBackgroundColor}
          textColor={featuredTextColor}
          transitionProgress={backgroundTransition}
        />

        <TrustBar backgroundColor="#ffffff" textColor="#000000" />
      </div>

      {/* Footer - White Background */}
      <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 mt-auto footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-800">
              MARKETING STUDIO · NEW YORK · © 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
