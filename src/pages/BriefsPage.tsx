import React, { useEffect } from "react";
import { motion } from "framer-motion";
import BriefsGrid from "../components/BriefsGrid";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const BriefsPage = () => {
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

  const briefs = [
    {
      title: "It All Start",
      thumbnail:
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/41dc3080-06cb-4e9f-e3f1-70dae20bc500/public",
      slides: [
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/41dc3080-06cb-4e9f-e3f1-70dae20bc500/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/ef1e0398-fab5-4ee8-6e17-4019f0815900/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/afb7bdc7-ff84-4292-037b-18c3ea3e3300/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/3b28c9e6-7fc6-4615-204b-4034dd593f00/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/e9d87530-1122-402c-a151-370f12335a00/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/e205b728-b32c-4b6e-ca8d-69ecd5993600/public",
        "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/a7e928b3-7d8e-477c-164a-1b391ab0f000/public",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Main Content - Flex grow to push footer down */}
      <main className="flex-grow">
        {/* Hero Section - Increased top padding */}
        <section className="pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-4 mb-8">
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <span className="text-xs tracking-[0.3em] text-blue-400/80 font-light">
                  FILM TREATMENTS
                </span>
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight mb-6"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="block">Visual</span>
                <span className="block text-blue-400/90">Narratives</span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-2xl mx-auto"
                style={{ letterSpacing: "0.01em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Immersive film treatments that transform concepts into visual
                stories, crafted for minds that refuse the ordinary.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Briefs Grid - Minimal top padding, increased bottom padding */}
        <section className="pt-2 pb-32 sm:pt-3 sm:pb-40 md:pt-4 md:pb-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BriefsGrid briefs={briefs} />
          </div>
        </section>
      </main>

      {/* Footer - Pushed to bottom */}
      <footer className="border-t border-gray-800 py-12 sm:py-16 mt-auto">
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

export default BriefsPage;
