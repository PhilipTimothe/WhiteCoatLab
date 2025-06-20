// BriefsGrid.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BriefModal from "./BriefModal";

interface Brief {
  title: string;
  slides: string[];
  thumbnail: string;
}

interface BriefsGridProps {
  briefs: Brief[];
}

const BriefsGrid: React.FC<BriefsGridProps> = ({ briefs }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = (brief: Brief) => {
    setSelectedBrief(brief);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBrief(null), 300);
  };

  return (
    <div ref={gridRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {briefs.map((brief, index) => (
          <motion.div
            key={brief.title}
            className="cursor-pointer group"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => openModal(brief)}
          >
            <div className="relative w-full overflow-hidden bg-gray-900">
              <motion.img
                src={brief.thumbnail}
                alt={brief.title}
                className="w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                whileHover={{ scale: 1.02 }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <BriefModal
        isOpen={isModalOpen}
        onClose={closeModal}
        brief={selectedBrief}
      />
    </div>
  );
};

export default BriefsGrid;
