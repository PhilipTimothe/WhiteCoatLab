import React, { useState, useEffect } from "react";
import { Plus, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  "BLACK & WHITE",
  "BRIDE",
  "GROOM",
  "COUPLE",
  "PARTY",
  "FILM",
  "DETAILS",
  "PRESS",
  "EDITORIAL",
  "MORE",
];

const FullscreenMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Toggle Button - responsive sizing */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-orange-400 transition-colors duration-300 z-[110] relative p-1"
        aria-label="Toggle fullscreen menu"
      >
        <Plus
          className={`h-4 w-4 sm:h-5 sm:w-5 transform origin-center transition-transform duration-500 ${
            isOpen ? "rotate-[405deg]" : "rotate-0"
          }`}
        />
      </button>

      {/* Menu Indicator - positioned under the plus button, hidden on very small screens */}
      {!isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 hidden sm:block">
          <div className="flex flex-col items-center space-y-2">
            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 animate-bounce" />
            <span className="text-xs text-gray-400 tracking-wider">MENU</span>
          </div>
        </div>
      )}

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.nav
              className="space-y-4 sm:space-y-6 md:space-y-8 text-center w-full max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {menuItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace("&", "and")}`}
                  onClick={() => setIsOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white hover:text-orange-400 transition-colors duration-300 leading-tight"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 550,
                    letterSpacing: "0.07em",
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullscreenMenu;
