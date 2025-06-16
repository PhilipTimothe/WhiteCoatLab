import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const videoSrc = 'https://customer-03tgn6o4u930capn.cloudflarestream.com/5a83fbfc9e04432578776d9cacf19d5b/manifest/video.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover absolute inset-0 z-0 opacity-40"
    />
  );
};

export default VideoBackground;