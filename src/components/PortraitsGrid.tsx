import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PortraitsGridProps {
  images: string[];
}

const PortraitsGrid: React.FC<PortraitsGridProps> = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up intersection observers for each image
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    imageRefs.current.forEach((imageRef, index) => {
      if (imageRef) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => new Set([...prev, index]));
            }
          },
          {
            threshold: 0.1,
            rootMargin: "-5% 0px -15% 0px",
          }
        );

        observer.observe(imageRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [images.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  // Create chunks of 3 images for rows
  const imageRows = [];
  for (let i = 0; i < images.length; i += 3) {
    imageRows.push(images.slice(i, i + 3));
  }

  return (
    <div ref={containerRef} className="w-full space-y-3">
      {imageRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {row.map((image, imageIndex) => {
            const globalIndex = rowIndex * 3 + imageIndex;
            const isVisible = visibleImages.has(globalIndex);

            return (
              <motion.div
                key={globalIndex}
                ref={(el) => {
                  imageRefs.current[globalIndex] = el;
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
                  delay: imageIndex * 0.1, // Stagger within each row
                }}
                className="h-[500px] overflow-hidden bg-gray-900 relative group"
              >
                {/* Static loading placeholder */}
                {!loadedImages.has(globalIndex) && (
                  <div className="absolute inset-0 bg-gray-800" />
                )}

                <img
                  src={image}
                  alt={`Portrait ${globalIndex + 1}`}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out ${
                    loadedImages.has(globalIndex) ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(globalIndex)}
                  loading="lazy"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Bottom indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center mt-16 sm:mt-20"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="w-10 h-px bg-gray-600"></div>
          <span className="text-xs tracking-widest text-gray-500">
            {images.length} PORTRAITS
          </span>
          <div className="w-10 h-px bg-gray-600"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortraitsGrid;
