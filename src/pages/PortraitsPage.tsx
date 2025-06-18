import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import PortraitsGrid from "../components/PortraitsGrid";
import FullscreenMenu from "../components/FullscreenMenu";

const PortraitsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // All portrait image IDs
  const portraitImages = [
    "25350851-f816-46bb-6ca6-ffc944e6e900",
    "0389282d-91a1-4800-3ec9-0d3e3af3b900",
    "d596c3a4-20ad-4800-be5b-85ff35602100",
    "20b0cd55-d3ec-48bd-5531-e07aa85a0500",
    "42fb1b30-5a7a-4085-1e6f-17bf177fc600",
    "ee526d1b-6a3d-4805-48b0-919857058100",
    "a5a77610-08d3-480c-1fe2-6ea83cfefd00",
    "1d4c059b-724e-4ade-2184-cc2b6e8acc00",
    "b2b3181d-a53d-42b7-de4f-02ab0c10b300",
    "b2c249c0-86cf-4680-a7a3-b08766816700",
    "ddb269cc-01c8-4f47-4b36-c6206be84f00",
  ].map(
    (id) => `https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/${id}/public`
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Navigation Header */}
      <nav className="relative z-50 w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              <Link
                to="/"
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors text-white"
              >
                WHITECOATLAB
              </Link>
              <a
                href="#photographers"
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors text-white"
              >
                WHO WE ARE
              </a>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <a
                  href="#commercials"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center text-white"
                >
                  WORKS<sup className="text-xs ml-1">01</sup>
                </a>
                <a
                  href="#narrative"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors flex items-center text-white"
                >
                  BRIEFS<sup className="text-xs ml-1">02</sup>
                </a>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
              <a
                href="#contact"
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-orange-400 transition-colors text-white"
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
                  className="block text-sm font-medium tracking-wider hover:text-orange-400 transition-colors py-2 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section - Increased top padding */}
        <section className="pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="w-10 h-px bg-gray-600"></div>
                <span className="text-xs tracking-widest font-medium text-gray-400">
                  PORTRAIT PHOTOGRAPHY
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portraits Grid - Minimal top padding */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortraitsGrid images={portraitImages} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-400 mb-4">
              © 2025 WHITECOATLAB
            </p>
            <p className="text-xs text-gray-500">NEW YORK</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortraitsPage;
