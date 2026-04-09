import React, { useEffect } from "react";
import { motion } from "framer-motion";
import VisualStoriesGrid from "../components/VisualStoriesGrid";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const VisualStoriesPage = () => {
  // Set page background to black
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.documentElement.style.backgroundColor = "#000000";

    return () => {
      // Reset to default when leaving page
      document.body.style.backgroundColor = "#000000";
      document.documentElement.style.backgroundColor = "#000000";
    };
  }, []);

  // Visual stories videos
  const visualStories = [
    {
      title: "Cutler & Gross",
      videoSrc:
        "https://customer-o9ac0gnpm96dfbq7.cloudflarestream.com/5b3e0e8634491c86fad38b5b94aaaffe/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Glowbar",
      videoSrc:
        "https://customer-o9ac0gnpm96dfbq7.cloudflarestream.com/068890784fc3bd9077f6c3dcf36f787c/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Grand Street Pizza",
      videoSrc:
        "https://customer-o9ac0gnpm96dfbq7.cloudflarestream.com/14f8999012826353ec8af7c17a1eb94f/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnailStartTime: 0.2, // 6 frames at 30fps = 6/30 = 0.2 seconds
      hoverStartTime: 0.2, // Start hover video at 6 frames in
    },
    // {
    //   title: "Givenchy Project",
    //   videoSrc:
    //     "https://customer-03tgn6o4u930capn.cloudflarestream.com/e3adda6538f131965040dff41c78763d/manifest/video.m3u8",
    //   posterSrc:
    //     "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800",
    //   thumbnailStartTime: 0.167, // 5 frames at 30fps = 5/30 = 0.167 seconds
    //   hoverStartTime: 0.167, // Start hover video at 5 frames in
    // },
    {
      title: "Darby Construction",
      videoSrc:
        "https://customer-o9ac0gnpm96dfbq7.cloudflarestream.com/5982b945af337ab4f5d6e7e1a4b12460/manifest/video.m3u8",
      posterSrc:
        "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    // {
    //   title: "In The Lab",
    //   videoSrc:
    //     "https://customer-03tgn6o4u930capn.cloudflarestream.com/6afbf1a3ab525a17b50c36e5a068169b/manifest/video.m3u8",
    //   posterSrc:
    //     "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
    // },
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
