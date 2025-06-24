import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const ContactPage = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mzzgayad", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Main Content */}
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16 sm:mb-20 md:mb-24"
            >
              <div className="flex items-center justify-center space-x-4 mb-8">
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-600 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <span className="text-xs tracking-[0.3em] text-neutral-500 dark:text-neutral-400 font-light uppercase">
                  Get in Touch
                </span>
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-600 to-transparent"
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
                <span className="block">Let's Create</span>
                <span className="block text-blue-500 dark:text-blue-400">
                  Something
                </span>
                <span className="block">Extraordinary</span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto"
                style={{ letterSpacing: "0.01em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Whether you're building something new or reimagining a brand,
                we'd love to hear from you. Fill out the form and let's start a
                conversation about bringing your vision to life.
              </motion.p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="max-w-4xl mx-auto"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16 sm:py-20"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light mb-4">
                    Message Sent Successfully
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 sm:space-y-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Form Fields */}
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        <label
                          htmlFor="name"
                          className="block text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-3"
                        >
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full border-0 border-b border-neutral-300 dark:border-neutral-600 bg-transparent px-0 py-4 text-base sm:text-lg focus:outline-none focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-300"
                          placeholder="Your full name"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        <label
                          htmlFor="email"
                          className="block text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-3"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full border-0 border-b border-neutral-300 dark:border-neutral-600 bg-transparent px-0 py-4 text-base sm:text-lg focus:outline-none focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-300"
                          placeholder="your@email.com"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <label
                          htmlFor="company"
                          className="block text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-3"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          className="w-full border-0 border-b border-neutral-300 dark:border-neutral-600 bg-transparent px-0 py-4 text-base sm:text-lg focus:outline-none focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-300"
                          placeholder="Company or organization"
                        />
                      </motion.div>
                    </div>

                    {/* Right Column - Message */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="flex flex-col h-full"
                    >
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-3"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={8}
                        className="flex-1 border-0 border-b border-neutral-300 dark:border-neutral-600 bg-transparent px-0 py-4 text-base sm:text-lg focus:outline-none focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none transition-colors duration-300"
                        placeholder="Tell us about your project, goals, timeline, and anything else that would help us understand your vision..."
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center pt-8 sm:pt-12"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className={`
                        relative overflow-hidden px-12 py-4 text-sm tracking-[0.2em] uppercase font-medium
                        bg-black dark:bg-white text-white dark:text-black
                        hover:bg-neutral-800 dark:hover:bg-neutral-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300 ease-out
                        border border-black dark:border-white
                        group
                      `}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </span>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Footer Note */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-600 to-transparent" />
              <span className="text-xs tracking-[0.3em] text-neutral-500 dark:text-neutral-400 font-light uppercase">
                Based in NYC. Working Worldwide.
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-600 to-transparent" />
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wider">
              © 2025 WHITECOATLAB
            </p>
          </div>
        </motion.section>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default ContactPage;
