import React from "react";
import { motion } from "framer-motion";
import VisualStoriesGrid from "../components/VisualStoriesGrid";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const VisualStoriesPage = () => {
  // Visual stories videos
  const visualStories = [
    {
      title: "Cutler & Gross",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/5a83fbfc9e04432578776d9cacf19d5b/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Glowbar",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/1ac895b4a801d10e83a7ee3284d0b50f/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Grand Street Pizza",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/87ea424656f85c90562a8e91f720d777/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnailStartTime: 0.2, // 6 frames at 30fps = 6/30 = 0.2 seconds
      hoverStartTime: 0.2, // Start hover video at 6 frames in
    },
    {
      title: "Givenchy Project",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/e3adda6538f131965040dff41c78763d/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnailStartTime: 0.167, // 5 frames at 30fps = 5/30 = 0.167 seconds
      hoverStartTime: 0.167, // Start hover video at 5 frames in
    },
    {
      title: "Darby Construction",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/6422435b78aca34ac7cf027fcb39f1fd/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "In The Lab",
      videoSrc:
        "https://customer-03tgn6o4u930capn.cloudflarestream.com/6afbf1a3ab525a17b50c36e5a068169b/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Main Content */}
      <main>
        {/* Hero Section - Matching Portraits page structure */}
        <section className="pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-4 mt-8">
                <div className="w-10 h-px bg-gray-600"></div>
                <span className="text-xs tracking-widest font-medium text-gray-400">
                  VISUAL STORIES
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Visual Stories Grid - Minimal top padding */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <VisualStoriesGrid videos={visualStories} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-400 mb-4">
              © 2025 WHITECOATLAB
            </p>
            <p className="text-xs text-gray-500">NEW YORK</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default VisualStoriesPage;
