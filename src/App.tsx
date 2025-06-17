import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import VideoBackground from "./components/VideoBackground";
import FullscreenMenu from "./components/FullscreenMenu";
import SplitTextReveal from "./components/SplitTextReveal";

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
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
                <a
                  href="#directors"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
                >
                  DIRECTORS
                </a>
                <a
                  href="#photographers"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
                >
                  PHOTOGRAPHERS
                </a>
              </div>

              {/* Center Navigation */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
                <div className="flex items-center space-x-4 lg:space-x-8">
                  <a
                    href="#commercials"
                    className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center"
                  >
                    COMMERCIALS<sup className="text-xs ml-1">01</sup>
                  </a>
                  <a
                    href="#narrative"
                    className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center"
                  >
                    NARRATIVE<sup className="text-xs ml-1">02</sup>
                  </a>
                </div>
              </div>

              {/* Right Navigation */}
              <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
                <a
                  href="#contact"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors"
                >
                  CONTACT
                </a>
                <FullscreenMenu />
              </div>

              {/* Mobile Navigation */}
              <div className="flex items-center space-x-4 sm:hidden">
                <FullscreenMenu />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-orange-400 p-2"
                  aria-label="Toggle mobile menu"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="sm:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 z-40">
              <div className="px-4 py-6 space-y-4">
                {[
                  "DIRECTORS",
                  "PHOTOGRAPHERS",
                  "COMMERCIALS",
                  "NARRATIVE",
                  "CONTACT",
                ].map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.toLowerCase()}`}
                    className="block text-sm font-medium tracking-wider hover:text-orange-400 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

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
                transform: `translateY(${logoVisible ? scrollY * 0.4 : 32}px)`,
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

      {/* Narrative Section */}
      <section className="relative min-h-screen bg-black-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-start pt-24 sm:pt-32 lg:pt-40">
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
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight"
                      delay={0}
                    />
                    <SplitTextReveal
                      text="and emotionally unforgettable narratives that"
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight"
                      delay={0.1}
                    />
                    <SplitTextReveal
                      text="live far beyond the frame."
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight"
                      delay={0.2}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-px bg-white"></div>
                    <span className="text-xs text-gray-400 tracking-widest font-medium">
                      STORYTELLING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
