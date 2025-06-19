import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoModal from "./VideoModal";
import VideoThumbnail from "./VideoThumbnail";

interface Video {
  title: string;
  videoSrc: string;
  posterSrc: string;
  thumbnailStartTime?: number;
  hoverStartTime?: number;
}

interface VisualStoriesGridProps {
  videos: Video[];
}

const VisualStoriesGrid: React.FC<VisualStoriesGridProps> = ({ videos }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleVideoClick = (videoSrc: string, title: string) => {
    setSelectedVideo({ src: videoSrc, title });
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  // Calculate colors for black background
  const textColor = "#ffffff";
  const borderColor = "#444444";
  const categoryColor = "#9CA3AF";

  return (
    <div ref={ref} className="w-full">
      {/* Works List - Matching Featured Works structure but without hover effects */}
      <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        {videos.map((video, index) => (
          <motion.div
            key={video.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: index * 0.1,
            }}
            className="group"
          >
            {/* Video Thumbnail - No title/subtitle displayed */}
            <div className="mb-8">
              <VideoThumbnail
                videoSrc={video.videoSrc}
                posterSrc={video.posterSrc}
                title=""
                subtitle=""
                onClick={() => handleVideoClick(video.videoSrc, video.title)}
                delay={index * 0.1}
                thumbnailStartTime={video.thumbnailStartTime}
                hoverStartTime={video.hoverStartTime}
              />
            </div>

            {/* Work Title and Category - No hover effects */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:py-8 border-b"
              style={{
                borderColor: borderColor,
              }}
            >
              <div className="mb-2 sm:mb-0">
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    lineHeight: 1.1,
                    color: textColor,
                  }}
                >
                  {video.title}
                </h3>
              </div>
              <div className="flex-shrink-0">
                <span
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    color: categoryColor,
                  }}
                >
                  Visual Storytelling
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeModal}
        videoSrc={selectedVideo?.src || ""}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default VisualStoriesGrid;
