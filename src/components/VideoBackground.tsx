import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc =
      "https://customer-03tgn6o4u930capn.cloudflarestream.com/5a83fbfc9e04432578776d9cacf19d5b/manifest/video.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
    }
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        transform: `translateY(${scrollY * 0.5}px)`,
        height: "120vh", // Make container taller to accommodate parallax movement
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-40"
        style={{
          minHeight: "100%",
          minWidth: "100%",
        }}
      />
    </div>
  );
};

export default VideoBackground;
