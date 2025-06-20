import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Brief {
  title: string;
  slides: string[];
  thumbnail: string;
}

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  brief: Brief | null;
}

const BriefModal: React.FC<BriefModalProps> = ({ isOpen, onClose, brief }) => {
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset state when modal opens/closes or brief changes
  useEffect(() => {
    if (!isOpen || !brief?.slides) {
      setVisibleSlides(new Set());
      setLoadedImages(new Set());
      slideRefs.current = [];
      return;
    }

    // Initialize the first few slides as visible immediately
    const initialVisible = new Set([0, 1, 2]);
    setVisibleSlides(initialVisible);
  }, [isOpen, brief]);

  // Set up intersection observers for slides
  useEffect(() => {
    if (!isOpen || !brief?.slides) return;

    const observers: IntersectionObserver[] = [];

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      slideRefs.current.forEach((slideRef, index) => {
        if (slideRef) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisibleSlides((prev) => new Set([...prev, index]));
              }
            },
            {
              threshold: 0.1,
              rootMargin: "-5% 0px -15% 0px",
            }
          );

          observer.observe(slideRef);
          observers.push(observer);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isOpen, brief?.slides]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load slide ${index + 1}`);
  };

  if (!brief) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="fixed top-8 right-8 text-white hover:text-gray-300 transition-colors duration-300 p-4 z-[210]"
            aria-label="Close brief modal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <X className="h-8 w-8" />
          </motion.button>

          {/* Full page scrollable content with much wider images */}
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <div className="max-w-7xl mx-auto px-2 sm:px-3 py-20">
              {/* Single column layout with minimal side spacing */}
              <div className="space-y-3">
                {brief.slides.map((slide, index) => {
                  const isVisible = visibleSlides.has(index);
                  const isLoaded = loadedImages.has(index);

                  return (
                    <motion.div
                      key={index}
                      ref={(el) => {
                        slideRefs.current[index] = el;
                      }}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={
                        isVisible
                          ? {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }
                          : {
                              opacity: 0,
                              y: 40,
                              scale: 0.95,
                            }
                      }
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: index * 0.1, // Stagger animation
                      }}
                      className="relative overflow-hidden bg-gray-900 group"
                    >
                      {/* Loading placeholder */}
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center min-h-[400px]">
                          <div className="text-center">
                            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-3 mx-auto" />
                            <p className="text-xs text-gray-400">
                              Loading slide {index + 1}...
                            </p>
                          </div>
                        </div>
                      )}

                      <img
                        src={slide}
                        alt={`${brief.title} - Slide ${index + 1}`}
                        className={`w-full h-auto object-contain group-hover:scale-105 transition-all duration-700 ease-out ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                        loading={index < 3 ? "eager" : "lazy"} // Load first 3 images immediately
                      />

                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom spacing */}
              <div className="h-20" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BriefModal;
