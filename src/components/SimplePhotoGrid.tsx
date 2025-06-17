import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SimplePhotoGridProps {
  images: string[];
  delay?: number;
}

const SimplePhotoGrid: React.FC<SimplePhotoGridProps> = ({
  images,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Take only first 3 images
  const displayImages = images.slice(0, 3);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: delay + index * 0.1,
            }}
            className="h-[500px] overflow-hidden bg-gray-100"
          >
            <img
              src={image}
              alt={`WhiteCoatLab ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimplePhotoGrid;
