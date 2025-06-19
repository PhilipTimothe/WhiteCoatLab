import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ArchitectureGrid from "../components/ArchitectureGrid";
import FullscreenMenu from "../components/FullscreenMenu";

const ArchitecturePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // All architecture image IDs - Randomized order
  const architectureImages = [
    "e38fe85f-72b2-45a1-51f3-e80fa057e100",
    "815adbc6-cbaa-4912-0df0-89e2cf392300",
    "9079d3da-9fc6-4a68-f1b8-5e908c7cc100",
    "2b4b2db0-e14c-4a77-b016-e1fa08074300",
    "fd1d5951-54fc-4795-20b6-6fb4d3c8be00",
    "3c463b74-0b4e-4a69-06d5-eafd856e5c00",
    "426ff317-2b68-4104-71f7-b5c9007f5000",
    "ee9b0dc8-bb5d-4cc7-1745-13aae4d39b00",
    "16fe6850-dea0-4696-f9b2-85851e2dc600",
    "abaffbb6-1847-476b-63de-99523038b700",
    "900480af-0454-4e10-e5d3-9e5ff5a2b700",
    "7cda5900-1137-4d18-b658-a956e373d200",
    "3f6a665a-ea38-4489-4610-32d86d8e0300",
    "90fc5b5a-4e4b-446d-443d-759b134d3b00",
    "f861a9d8-bb73-4521-34a7-c81e58292000",
    "056a8be7-ccbb-4e12-c619-0ad3383e3700",
    "e0255140-26de-422c-bbae-4095e94d4000",
    "2dec6203-b8c0-449a-0d9c-ba11ba90aa00",
    "a5a6c0b6-96fd-418c-00b8-561b466c4900",
    "9d4d312b-8032-41a3-7f43-df42bb417400",
    "4331e98d-7fb0-40be-ba05-3ec52d56b100",
    "6fd3ab07-6666-46a8-eb9e-73039eb78100",
    "10f5a074-349d-4784-0627-df8face83d00",
    "9609629b-53d3-4f04-d03b-da34938b9000",
    "15502193-e923-4f11-f5c2-63714959ff00",
    "0d39b8e3-01ee-4843-94e7-32ca7da5ac00",
    "54c726f4-f910-4180-948e-0a8d1d3a1400",
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
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors text-white"
              >
                WHITECOATLAB
              </Link>
              <a
                href="#photographers"
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors text-white"
              >
                WHO WE ARE
              </a>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <a
                  href="#commercials"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors flex items-center text-white"
                >
                  WORKS<sup className="text-xs ml-1">01</sup>
                </a>
                <a
                  href="#narrative"
                  className="text-xs xl:text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors flex items-center text-white"
                >
                  BRIEFS<sup className="text-xs ml-1">02</sup>
                </a>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
              <a
                href="#contact"
                className="text-xs xl:text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors text-white"
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
                className="text-white hover:text-blue-400/80 p-2"
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
              <Link
                to="/"
                className="block text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors py-2 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                WHITECOATLAB
              </Link>
              {["WHO WE ARE", "WORKS", "BRIEFS", "CONTACT"].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm font-medium tracking-wider hover:text-blue-400/80 transition-colors py-2 text-white"
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
                  ARCHITECTURE PHOTOGRAPHY
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architecture Grid - Minimal top padding */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArchitectureGrid images={architectureImages} />
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

export default ArchitecturePage;
