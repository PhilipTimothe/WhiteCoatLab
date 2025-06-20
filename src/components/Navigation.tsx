import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FullscreenMenu from "./FullscreenMenu";

interface NavigationProps {
  theme?: "dark" | "light";
}

const Navigation: React.FC<NavigationProps> = ({ theme = "dark" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine text colors based on theme
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor = "hover:text-blue-400/80";
  const activeColor = "text-blue-400/80";
  const mobileMenuBg = theme === "dark" ? "bg-black/95" : "bg-white/95";
  const mobileBorder = theme === "dark" ? "border-gray-800" : "border-gray-200";

  // Helper function to check if current page matches
  const isCurrentPage = (path: string) => location.pathname === path;

  // Handle scrolling to Featured Works after navigation
  useEffect(() => {
    // Check if we just navigated to home with the featured-works hash
    if (location.pathname === "/" && location.hash === "#featured-works") {
      // Small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        const featuredSection = document.querySelector("#featured-works");
        if (featuredSection) {
          // Use custom smooth scroll with 1000ms duration for cross-page navigation
          smoothScrollTo(featuredSection, 1000);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  // Smooth scroll function with configurable duration
  const smoothScrollTo = (element: Element, duration: number = 1000) => {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  // Helper function to handle Featured Works link
  const handleFeaturedWorksClick = (e: React.MouseEvent) => {
    // If we're not on the home page, navigate to home with hash
    if (location.pathname !== "/") {
      navigate("/#featured-works");
      return;
    }

    // If we're on the home page, prevent default and scroll to section with custom smooth scroll
    e.preventDefault();
    const featuredSection = document.querySelector("#featured-works");
    if (featuredSection) {
      // Use 1500ms for same-page scrolling (slightly slower for better UX)
      smoothScrollTo(featuredSection, 1000);
    }
  };

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
              WHO WE ARE
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <button
                onClick={handleFeaturedWorksClick}
                className={`text-xs xl:text-sm font-medium tracking-wider transition-colors flex items-center ${textColor} ${hoverColor} cursor-pointer`}
              >
                FEATURED WORKS<sup className="text-xs ml-1">01</sup>
              </button>
              <Link
                to="/briefs"
                className={`text-xs xl:text-sm font-medium tracking-wider transition-colors flex items-center ${
                  isCurrentPage("/briefs")
                    ? activeColor
                    : `${textColor} ${hoverColor}`
                }`}
              >
                BRIEFS<sup className="text-xs ml-1">02</sup>
              </Link>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
            <a
              href="#contact"
              className={`text-xs xl:text-sm font-medium tracking-wider transition-colors ${textColor} ${hoverColor}`}
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
              className={`${textColor} ${hoverColor} p-2`}
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
              WHO WE ARE
            </Link>
            <Link
              to="/briefs"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${
                isCurrentPage("/briefs")
                  ? activeColor
                  : `${textColor} ${hoverColor}`
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              BRIEFS
            </Link>
            <button
              onClick={(e) => {
                handleFeaturedWorksClick(e);
                setIsMenuOpen(false);
              }}
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${textColor} ${hoverColor} text-left w-full`}
            >
              FEATURED WORKS
            </button>
            <a
              href="#contact"
              className={`block text-sm font-medium tracking-wider transition-colors py-2 ${textColor} ${hoverColor}`}
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
