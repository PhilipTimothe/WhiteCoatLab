import React from "react";
import { motion } from "framer-motion";
import PortraitsGrid from "../components/PortraitsGrid";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const PortraitsPage = () => {
  // All portrait image IDs - including new additions
  const portraitImages = [
    "25350851-f816-46bb-6ca6-ffc944e6e900",
    "0389282d-91a1-4800-3ec9-0d3e3af3b900",
    "d596c3a4-20ad-4800-be5b-85ff35602100",
    "20b0cd55-d3ec-48bd-5531-e07aa85a0500",
    "42fb1b30-5a7a-4085-1e6f-17bf177fc600",
    "ee526d1b-6a3d-4805-48b0-919857058100",
    "a5a77610-08d3-480c-1fe2-6ea83cfefd00",
    "1d4c059b-724e-4ade-2184-cc2b6e8acc00",
    "b2b3181d-a53d-42b7-de4f-02ab0c10b300",
    "b2c249c0-86cf-4680-a7a3-b08766816700",
    "ddb269cc-01c8-4f47-4b36-c6206be84f00",
    "c3a1d8fe-9628-47a0-57b9-4542b8b38500",
    "2415b0cc-41da-49e8-f52a-41be5774ab00",
    "f0aee628-d621-4f0d-41e2-2db3735e9000",
    "a67f71eb-38b1-487d-ebc7-886f208d6600",
    "e1da7443-a964-4f4b-985b-cbed1153f700",
    "5eafc16b-12b2-43ea-7333-a622064c3600",
  ].map(
    (id) => `https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/${id}/public`
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation theme="dark" />

      {/* Main Content */}
      <main>
        {/* Hero Section - Increased top padding */}
        <section className="pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="w-10 h-px bg-gray-600"></div>
                <span className="text-xs tracking-widest font-medium text-gray-400">
                  PORTRAIT PHOTOGRAPHY
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portraits Grid - Minimal top padding */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortraitsGrid images={portraitImages} />
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

export default PortraitsPage;
