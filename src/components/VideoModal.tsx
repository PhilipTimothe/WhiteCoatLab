import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Hls from "hls.js";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const setupVideo = () => {
      if (videoSrc.includes(".m3u8")) {
        // HLS stream
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: false,
            lowLatencyMode: true,
          });
          hlsRef.current = hls;
          hls.loadSource(videoSrc);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(console.error);
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
          video.addEventListener("loadedmetadata", () => {
            video.play().catch(console.error);
          });
        }
      } else {
        // Regular MP4
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(console.error);
        });
      }
    };

    setupVideo();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isOpen, videoSrc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              controls
              className="w-full h-full object-cover"
              playsInline
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300 p-2 bg-black/50 rounded-full backdrop-blur-sm"
              aria-label="Close video modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video title */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
