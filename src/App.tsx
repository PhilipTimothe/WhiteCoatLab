import React, { useState, useEffect } from "react";
import VideoBackground from "./components/VideoBackground";
import { Menu, X, ChevronDown } from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Trigger logo animation first
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 500);

    // Trigger subtitle animation after logo
    const subtitleTimer = setTimeout(() => {
      setSubtitleVisible(true);
    }, 1200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
        <div className="absolute inset-0 bg-black-800/20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Navigation */}
            <div className="flex items-center space-x-12">
              <a
                href="#directors"
                className="text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
              >
                DIRECTORS
              </a>
              <a
                href="#photographers"
                className="text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
              >
                PHOTOGRAPHERS
              </a>
            </div>

            {/* Center Navigation */}
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-8">
                <a
                  href="#commercials"
                  className="text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center"
                >
                  COMMERCIALS
                  <sup className="text-xs ml-1">01</sup>
                </a>
                <a
                  href="#narrative"
                  className="text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center"
                >
                  NARRATIVE
                  <sup className="text-xs ml-1">02</sup>
                </a>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center">
              <a
                href="#contact"
                className="text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
              >
                CONTACT
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-orange-400 p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#directors"
                className="block text-sm font-medium tracking-wider hover:text-orange-400"
              >
                DIRECTORS
              </a>
              <a
                href="#photographers"
                className="block text-sm font-medium tracking-wider hover:text-orange-400"
              >
                PHOTOGRAPHERS
              </a>
              <a
                href="#commercials"
                className="block text-sm font-medium tracking-wider hover:text-orange-400"
              >
                COMMERCIALS
              </a>
              <a
                href="#narrative"
                className="block text-sm font-medium tracking-wider hover:text-orange-400"
              >
                NARRATIVE
              </a>
              <a
                href="#contact"
                className="block text-sm font-medium tracking-wider hover:text-orange-400"
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Centered Logo with Parallax and Separate Animations */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="text-center">
          {/* Main Logo */}
          <div
            className={`transition-all duration-1000 ease-out ${
              logoVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
            style={{
              transform: `translateY(${logoVisible ? scrollY * 0.5 : 32}px)`,
            }}
          >
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl leading-none"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 550,
                letterSpacing: "0.07em",
              }}
            >
              WHITECOATLAB
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 ease-out ${
              subtitleVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
            style={{
              transform: `translateY(${
                subtitleVisible ? scrollY * 0.3 : 16
              }px)`,
            }}
          >
            <p
              className="text-sm md:text-base lg:text-lg font-light tracking-widest text-white/90 mt-2"
              style={{ letterSpacing: "0.3em" }}
            >
              NEW YORK
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-400 tracking-wider">SCROLL</span>
          <ChevronDown className="h-4 w-4 text-gray-400 animate-bounce" />
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col">
          <div className="-rotate-90 origin-center py-1 leading-none">
            <span className="text-xs text-gray-400 tracking-widest whitespace-nowrap">
              CREATIVE PRODUCTION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
