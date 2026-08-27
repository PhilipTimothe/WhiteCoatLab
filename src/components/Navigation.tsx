import React, { useState } from "react";
import { Menu, X, ChevronLeft, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import FullscreenMenu from "./FullscreenMenu";

interface NavigationProps {
  theme?: "dark" | "light";
}

const Navigation: React.FC<NavigationProps> = ({ theme = "dark" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Determine text colors based on theme
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor = "hover:text-blue-400/80";
  const activeColor = "text-blue-400/80";
  const mobileMenuBg = theme === "dark" ? "bg-black/95" : "bg-white/95";
  const mobileBorder = theme === "dark" ? "border-gray-800" : "border-gray-200";

  // Helper function to check if current page matches
  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <Link
              to="/"
              className={`text-xs xl:text-sm font-medium tracking-wider transition-colors ${
                isCurrentPage("/") ? activeColor : `${textColor} ${hoverColor}`
              }`}
            >
              WHITECOATLAB
            </Link>
            <Link
              to="/who-we-are"
              className={`text-xs xl:text-sm font-medium tracking-wider transition-colors ${
                isCurrentPage("/who-we-are")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
            >
              STUDIO
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <Link
                to="/work"
                className={`text-xs xl:text-sm font-medium tracking-wider transition-colors flex items-center ${
                  isCurrentPage("/work")
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                WORK<sup className="text-xs ml-1">01</sup>
              </Link>
              <Link
                to="/approach"
                className={`text-xs xl:text-sm font-medium tracking-wider transition-colors flex items-center ${
                  isCurrentPage("/approach")
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                APPROACH<sup className="text-xs ml-1">02</sup>
              </Link>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
            <a
              href="https://www.instagram.com/whitecoatlab"
              target="_blank"
              rel="noopener noreferrer"
              className={`${textColor} ${hoverColor} transition-colors duration-300 p-1`}
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-4 w-4 xl:h-5 xl:w-5" />
            </a>
            <Link
              to="/contact"
              className={`text-xs xl:text-sm font-medium tracking-wider transition-colors ${
                isCurrentPage("/contact")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
            >
              START
            </Link>
            <FullscreenMenu />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 sm:hidden">
            <FullscreenMenu />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${textColor} ${hoverColor} p-2`}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Menu Indicator - Only show when menu is closed */}
              {!isMenuOpen && (
                <div className="flex items-center space-x-1">
                  <ChevronLeft className="h-3 w-3 text-gray-400 animate-pulse" />
                  <span className="text-xs text-gray-400 tracking-wider">
                    MENU
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`sm:hidden absolute top-full left-0 right-0 ${mobileMenuBg} backdrop-blur-md border-t ${mobileBorder} z-40`}
        >
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/") ? activeColor : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              WHITECOATLAB
            </Link>
            <Link
              to="/who-we-are"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/who-we-are")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              STUDIO
            </Link>
            <Link
              to="/approach"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/approach")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              APPROACH
            </Link>
            <Link
              to="/work"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/work")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              WORK
            </Link>
            <a
              href="https://www.instagram.com/whitecoatlab"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 text-sm font-medium tracking-wider transition-colors py-2 ${textColor} ${hoverColor}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Instagram className="h-4 w-4" />
              <span>INSTAGRAM</span>
            </a>
            <Link
              to="/contact"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/contact")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              START
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
