import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";
import SimplePhotoGrid from "./SimplePhotoGrid";
import TrustBar from "./TrustBar";

interface FeaturedWorksProps {
  backgroundColor?: string;
  textColor?: string;
  transitionProgress?: number;
}

const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  backgroundColor = "#ffffff",
  textColor = "#000000",
  transitionProgress = 1,
}) => {
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

  const works = [
    {
      title: "FILMs",
      category: "Visual Storytelling | Narrative Filmmaking",
      delay: 0,
      hasVideos: true,
      videos: [
        {
          videoSrc:
            "https://customer-03tgn6o4u930capn.cloudflarestream.com/5a83fbfc9e04432578776d9cacf19d5b/manifest/video.m3u8",
          posterSrc:
            "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800",
          title: "Cutler & Gross",
          subtitle: "Boutique Designer Eyewear",
        },
        {
          videoSrc:
            "https://customer-03tgn6o4u930capn.cloudflarestream.com/1ac895b4a801d10e83a7ee3284d0b50f/manifest/video.m3u8",
          posterSrc:
            "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
          title: "Glowbar",
          subtitle: "Luxury Skincare",
        },
      ],
    },
    {
      title: "PhotographY",
      category: "Image Creation",
      delay: 0.1,
      hasVideos: false,
      hasPhotos: true,
      photos: [
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/b2b3181d-a53d-42b7-de4f-02ab0c10b300/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/a5a77610-08d3-480c-1fe2-6ea83cfefd00/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/1d4c059b-724e-4ade-2184-cc2b6e8acc00/public",
      ],
    },
    {
      title: "",
      category: "",
      delay: 0.2,
      hasVideos: false,
      hasTrustBar: true,
    },
  ];

  // Calculate secondary colors based on transition progress
  const lineColor = transitionProgress > 0.5 ? "#cccccc" : "#666666";
  const categoryColor = transitionProgress > 0.5 ? "#666666" : "#9CA3AF";
  const hoverTextColor =
    transitionProgress > 0.5
      ? "rgba(66, 133, 244, 0.8)"
      : "rgba(66, 133, 244, 0.8)";
  const borderColor = transitionProgress > 0.5 ? "#e5e5e5" : "#444444";
  const hoverBorderColor = transitionProgress > 0.5 ? "#cccccc" : "#666666";

  const handleVideoClick = (videoSrc: string, title: string) => {
    setSelectedVideo({ src: videoSrc, title });
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section
      id="featured-works"
      ref={ref}
      className="py-8 sm:py-12 md:py-16 lg:py-20 transition-colors duration-700 ease-out"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Moved to Right */}
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center space-x-4"
          >
            <span
              className="text-[9px] sm:text-xs tracking-widest font-medium uppercase transition-colors duration-700 ease-out"
              style={{ color: categoryColor }}
            >
              Featured Works
            </span>
            <div
              className="w-6 sm:w-10 h-px transition-colors duration-700 ease-out"
              style={{ backgroundColor: lineColor }}
            ></div>
          </motion.div>
        </div>

        {/* Works List */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {works.map((work, index) => (
            <motion.div
              key={work.title || `work-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: work.delay,
              }}
              className="group"
            >
              {/* Video Thumbnails for FILMs */}
              {work.hasVideos && work.videos && (
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {work.videos.map((video, index) => (
                    <VideoThumbnail
                      key={index}
                      videoSrc={video.videoSrc}
                      posterSrc={video.posterSrc}
                      title={video.title}
                      subtitle={video.subtitle}
                      onClick={() =>
                        handleVideoClick(video.videoSrc, video.title)
                      }
                      delay={work.delay + index * 0.1}
                    />
                  ))}
                </div>
              )}

              {/* Simple Photo Grid for Photography */}
              {work.hasPhotos && work.photos && (
                <div className="mb-8">
                  <SimplePhotoGrid images={work.photos} delay={work.delay} />
                </div>
              )}

              {/* Trust Bar for FABRIC™ */}
              {work.hasTrustBar && (
                <div className="mb-8">
                  <TrustBar
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                  />
                </div>
              )}

              {/* Work Title and Category - Only show if title exists, and conditionally show border */}
              {work.title && (
                <div
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:py-8 transition-all duration-300 cursor-pointer ${
                    index < works.length - 1 ? "border-b" : "" // Only add border if not the last item
                  }`}
                  style={{
                    borderColor: borderColor,
                  }}
                  onMouseEnter={(e) => {
                    if (index < works.length - 1) {
                      // Only apply hover effect if has border
                      e.currentTarget.style.borderColor = hoverBorderColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index < works.length - 1) {
                      // Only apply hover effect if has border
                      e.currentTarget.style.borderColor = borderColor;
                    }
                  }}
                >
                  <div className="mb-2 sm:mb-0">
                    <h3
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transition-colors duration-300"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: 1.1,
                        color: textColor,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverTextColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                      }}
                    >
                      {work.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className="text-sm sm:text-base transition-colors duration-300"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        color: categoryColor,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = textColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = categoryColor;
                      }}
                    >
                      {work.category}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeModal}
        videoSrc={selectedVideo?.src || ""}
        title={selectedVideo?.title || ""}
      />
    </section>
  );
};

export default FeaturedWorks;
