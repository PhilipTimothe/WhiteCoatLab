import React, { useState, useEffect } from "react";
import { Plus, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const menuCategories = [
  {
    title: "Photography",
    items: [
      { name: "PORTRAITS", href: "/portraits", isLink: true },
      { name: "BLACK & WHITE", href: "#black-and-white", isLink: false },
      { name: "LIFE IN COLOR", href: "#life-in-color", isLink: false },
      { name: "ARCHITECTURE", href: "/architecture", isLink: true },
    ],
  },
  {
    title: "Film",
    items: [
      { name: "VISUAL STORIES", href: "/visual-stories", isLink: true },
      { name: "DOCUMENTARY", href: "#documentary", isLink: false },
    ],
  },
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
        className="text-white hover:text-blue-400/80 transition-colors duration-300 z-[110] relative p-1"
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
              className="text-center w-full max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2, // Increased from 0.08 to 0.2 for slower category reveals
                  },
                },
              }}
            >
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {menuCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6, // Slightly longer duration for category titles
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      },
                    }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Category Title - Using Creative Production font style */}
                    <h2 className="text-xs text-gray-400 tracking-widest font-medium">
                      {category.title.toUpperCase()}
                    </h2>

                    {/* Category Items */}
                    <motion.div
                      className="space-y-3 sm:space-y-4 md:space-y-5"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.15, // Increased from 0.05 to 0.15 for much slower item reveals
                            delayChildren: 0.1, // Small delay before items start appearing
                          },
                        },
                      }}
                    >
                      {category.items.map((item) => (
                        <motion.div
                          key={item.name}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.8, // Increased duration for smoother appearance
                                ease: [0.25, 0.46, 0.45, 0.94],
                              },
                            },
                          }}
                        >
                          {item.isLink ? (
                            <Link
                              to={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white hover:text-blue-400/80 transition-colors duration-300 leading-tight"
                              style={{
                                fontFamily:
                                  "system-ui, -apple-system, sans-serif",
                                fontWeight: 550,
                                letterSpacing: "0.07em",
                              }}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white hover:text-blue-400/80 transition-colors duration-300 leading-tight"
                              style={{
                                fontFamily:
                                  "system-ui, -apple-system, sans-serif",
                                fontWeight: 550,
                                letterSpacing: "0.07em",
                              }}
                            >
                              {item.name}
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullscreenMenu;
