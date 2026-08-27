import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Hls from "hls.js";

interface CaseStudyImage {
  src: string;
  label: string;
}

interface CaseStudyProps {
  client: string;
  logo?: string;
  headline: string;
  stats: string[];
  situation: string;
  call: string;
  work: string;
  images?: CaseStudyImage[];
  videoId?: string;
  outcome: string;
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  client,
  logo,
  headline,
  stats,
  situation,
  call,
  work,
  images,
  videoId,
  outcome,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!videoId || !video) return;

    const videoSrc = `https://customer-o9ac0gnpm96dfbq7.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

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
  }, [videoId]);
  return (
    <article className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-12 sm:mb-16 text-center"
      >
        <span className="text-xs tracking-widest font-medium text-gray-500 block">
          {client.toUpperCase()}
        </span>
        {logo && (
          <img
            src={logo}
            alt={client}
            className="h-48 sm:h-64 w-auto mx-auto rounded-md mt-6 mb-4"
          />
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
          {headline}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base text-gray-400">
          {stats.map((stat, index) => (
            <React.Fragment key={stat}>
              {index > 0 && <span className="text-gray-700">·</span>}
              <span>{stat}</span>
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <div className="space-y-10 sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs tracking-widest font-medium text-gray-500 mb-4">
            THE SITUATION
          </h3>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            {situation}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-blue-500/10 border-l-2 border-blue-400 px-6 py-8 sm:px-8 sm:py-10 rounded-sm"
        >
          <h3 className="text-xs tracking-widest font-medium text-blue-300 mb-4">
            THE CALL
          </h3>
          <p className="text-base sm:text-lg text-gray-100 leading-relaxed font-light">
            {call}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs tracking-widest font-medium text-gray-500 mb-4">
            THE WORK
          </h3>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            {work}
          </p>
        </motion.div>

        {videoId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs aspect-[9/16] overflow-hidden rounded-sm bg-gray-900">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </motion.div>
        )}

        {images && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4"
          >
            {images.map((image) => (
              <div key={image.src} className="group">
                <div className="aspect-square overflow-hidden bg-gray-900">
                  <img
                    src={image.src}
                    alt={image.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{image.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs tracking-widest font-medium text-gray-500 mb-4">
            WHAT IT BECAME
          </h3>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            {outcome}
          </p>
        </motion.div>
      </div>
    </article>
  );
};

export default CaseStudy;
