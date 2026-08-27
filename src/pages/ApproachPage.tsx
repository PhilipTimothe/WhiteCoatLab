import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";
import { briefs } from "../data/briefs";

const layers = [
  {
    name: "Discovery",
    tag: "The front door",
    description:
      "Before anything gets made, we work to understand your goals, your brand, and your market, then define what the work should be. We set direction. We do not wait for a brief.",
  },
  {
    name: "Strategy",
    tag: "The product",
    description:
      "Out of discovery comes the direction, and that is the thing everything else serves. This is what you are actually hiring. The content and media follow from it, not the other way around.",
  },
  {
    name: "Production",
    tag: "The execution",
    description:
      "Photography, video, and digital work, produced on a system with clear scope and tight revisions so timelines stay predictable. Real craft, in service of the strategy above it.",
  },
];

const proofSlides = briefs[0].slides;

const ApproachPage = () => {
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-10 h-px bg-gray-600"></div>
                <span className="text-xs tracking-widest font-medium text-gray-400">
                  APPROACH
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                Most studios wait for the brief. We start earlier, with the
                question you haven't answered yet: what is this business
                actually trying to achieve. Then we build the direction, and
                the work follows from it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Three Layers */}
        <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 md:pt-20 md:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 sm:space-y-20">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
                >
                  <div className="md:col-span-4">
                    <span className="text-xs tracking-widest font-medium text-blue-400/80 uppercase">
                      {layer.tag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-light mt-2">
                      {layer.name}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof: an early treatment */}
        <section className="pt-2 pb-24 sm:pb-32 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
            <div className="text-center mb-12">
              <span className="text-xs tracking-widest font-medium text-gray-400">
                THE PROCESS, IN PRACTICE
              </span>
              <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                An early treatment from our process, made before a single
                frame was shot.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              {proofSlides.map((slide, index) => (
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-gray-900"
                >
                  <img
                    src={slide}
                    alt={`Treatment slide ${index + 1}`}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 sm:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-gray-400">
              MARKETING STUDIO · NEW YORK · © 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default ApproachPage;
