import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";

interface VideoThumbnailProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  delay?: number;
  thumbnailStartTime?: number;
  hoverStartTime?: number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  onClick,
  delay = 0,
  thumbnailStartTime = 0.1,
  hoverStartTime = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>("");

  // Detect in-viewport visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Setup video source (HLS or MP4)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupVideo = () => {
      if (videoSrc.includes(".m3u8") && Hls.isSupported()) {
        const hls = new Hls({ enableWorker: false, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => setIsVideoReady(true));
      } else {
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => setIsVideoReady(true));
      }
    };

    setupVideo();

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [videoSrc]);

  // Generate thumbnail from specified frame
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isVideoReady) return;

    const generateThumbnail = () => {
      video.currentTime = thumbnailStartTime;
      video.addEventListener("seeked", function onSeeked() {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const data = canvas.toDataURL("image/jpeg", 0.8);
          setThumbnail(data);
        }
        video.removeEventListener("seeked", onSeeked);
      });
    };

    if (video.readyState >= 2) {
      generateThumbnail();
    } else {
      video.addEventListener("loadeddata", generateThumbnail);
    }
  }, [isVideoReady, thumbnailStartTime]);

  // Handle hover in
  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    video.currentTime = hoverStartTime;
    video.play().catch((error) => {
      // Gracefully handle AbortError when play() is interrupted by pause()
      if (error.name !== "AbortError") {
        console.error("Video play error:", error);
      }
    });

    // Start looping every 10 seconds
    intervalRef.current = setInterval(() => {
      if (video && isHovered) {
        video.currentTime = hoverStartTime;
        video.play().catch((error) => {
          // Gracefully handle AbortError when play() is interrupted by pause()
          if (error.name !== "AbortError") {
            console.error("Video play error:", error);
          }
        });
      }
    }, 10000);
  };

  // Handle hover out
  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (video && !video.paused) {
      video.pause();
      video.currentTime = hoverStartTime;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
      className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Hidden canvas for generating the thumbnail */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Thumbnail Image (from specified frame) */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Fallback poster if thumbnail not generated yet */}
      {!thumbnail && (
        <img
          src={posterSrc}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Hover video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Text labels - Only show if title and subtitle are provided */}
      {(title || subtitle) && (
        <div className="absolute bottom-4 left-4 text-white">
          {title && (
            <h4 className="text-sm font-normal mb-1 text-white">{title}</h4>
          )}
          {subtitle && <p className="text-xs text-white/80">{subtitle}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default VideoThumbnail;
