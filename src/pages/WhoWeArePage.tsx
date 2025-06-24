import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const beliefs = [
  "We believe in the power of the unseen frame — the moment before and after the capture.",
  "We believe collaboration births the impossible, where individual vision becomes collective truth.",
  "We believe in process as poetry — methodical yet wild, structured yet free.",
  "We believe stories should haunt you gently, lingering long after the screen goes dark.",
  "We believe the future of visual storytelling is written in the margins of today.",
];

const WhoWeArePage = () => {
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const manifestoY = useTransform(scrollYProgress, [0.2, 0.8], [50, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="fixed inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ y: heroY }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-12">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <span className="text-xs tracking-[0.3em] text-blue-400/80 font-light">
                MANIFESTO
              </span>
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight mb-8"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 200,
              letterSpacing: "-0.02em",
              transform: `translate(${mousePosition.x * 0.5}px, ${
                mousePosition.y * 0.5
              }px)`,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="block">We build visual worlds</span>
            <span className="block text-blue-400/90">for the curious,</span>
            <span className="block">the fearless, and the</span>
            <span className="block text-blue-400/90">future-facing.</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-gray-400 leading-relaxed font-light"
            style={{ letterSpacing: "0.01em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Stories that transform perception, crafted for minds that refuse the
            ordinary.
          </motion.p>
        </div>
      </motion.section>

      {/* Who We Are Section */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-12 text-center tracking-wide">
              Who We Are
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <motion.p
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 mb-8 font-extralight"
                style={{ lineHeight: 1.7, fontWeight: 200 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We are{" "}
                <strong className="text-white font-light">Whitecoatlab</strong>{" "}
                — a creative studio that exists at the intersection of narrative
                ambition and aesthetic precision. We believe in the alchemy of
                collaboration, where individual vision dissolves into something
                larger, more resonant, more true.
              </motion.p>

              <motion.p
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 mb-8 font-extralight"
                style={{ lineHeight: 1.7, fontWeight: 200 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Our process is both methodical and intuitive — we experiment
                with form while honoring function, push boundaries while
                respecting craft. Every frame we capture, every story we tell,
                is an invitation to see the world through a different lens.
              </motion.p>

              <motion.p
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-400 font-extralight italic"
                style={{ lineHeight: 1.7, fontWeight: 200 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We are not just visual storytellers. We are architects of
                emotion for the digital age.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lab Breakdown Section */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          >
            {[
              {
                title: "White",
                subtitle: "Purity of Vision",
                description:
                  "Clean lines. Editorial precision. The clarity that cuts through noise to reveal essential truth.",
                delay: 0,
              },
              {
                title: "Coat",
                subtitle: "Creative Layering",
                description:
                  "Professional craft meets artistic intuition. The protective shell that allows bold ideas to flourish.",
                delay: 0.2,
              },
              {
                title: "Lab",
                subtitle: "Experimental Process",
                description:
                  "Where hypothesis meets creation. The space where failure teaches and success surprises.",
                delay: 0.4,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item.delay }}
                whileHover={{ y: -10 }}
              >
                <div className="relative mb-6">
                  <motion.h3
                    className="text-4xl sm:text-5xl md:text-6xl font-light mb-2 text-white group-hover:text-blue-400/90 transition-colors duration-500"
                    style={{ fontWeight: 200, letterSpacing: "-0.02em" }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.div
                    className="w-16 h-px bg-blue-400/60 mx-auto mb-4 group-hover:w-24 transition-all duration-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: item.delay + 0.3 }}
                  />
                </div>
                <h4 className="text-sm sm:text-base font-medium mb-4 text-blue-400/80 tracking-wider uppercase">
                  {item.subtitle}
                </h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <motion.section
        className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
        style={{ y: manifestoY }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-16 text-center tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            What We Believe
          </motion.h2>

          <div className="space-y-8 sm:space-y-12">
            {beliefs.map((belief, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                  <p
                    className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-extralight"
                    style={{ fontWeight: 200 }}
                  >
                    {belief}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
            <span className="text-xs tracking-[0.3em] text-gray-500 font-light">
              HAND-BUILT IN NEW YORK
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>
          <p className="text-sm text-gray-600 tracking-wider">
            OPEN TO THE WORLD
          </p>
        </motion.div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default WhoWeArePage;
