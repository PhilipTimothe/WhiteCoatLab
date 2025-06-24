import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ArchitectureGrid from "../components/ArchitectureGrid";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

const ArchitecturePage = () => {
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

  // All architecture image IDs - Randomized order
  const architectureImages = [
    "e38fe85f-72b2-45a1-51f3-e80fa057e100",
    "815adbc6-cbaa-4912-0df0-89e2cf392300",
    "9079d3da-9fc6-4a68-f1b8-5e908c7cc100",
    "df266f6d-b8e9-45f9-4f5d-a6a2d8bb7a00",
    "2b4b2db0-e14c-4a77-b016-e1fa08074300",
    "fd1d5951-54fc-4795-20b6-6fb4d3c8be00",
    "182335cf-bd9b-4165-1e6c-84196ab23600",
    "3c463b74-0b4e-4a69-06d5-eafd856e5c00",
    "426ff317-2b68-4104-71f7-b5c9007f5000",
    "ee9b0dc8-bb5d-4cc7-1745-13aae4d39b00",
    "16fe6850-dea0-4696-f9b2-85851e2dc600",
    "abaffbb6-1847-476b-63de-99523038b700",
    "900480af-0454-4e10-e5d3-9e5ff5a2b700",
    "e9556a93-a2d3-4649-4045-eb546ecc8e00",
    "7cda5900-1137-4d18-b658-a956e373d200",
    "3f6a665a-ea38-4489-4610-32d86d8e0300",
    "90fc5b5a-4e4b-446d-443d-759b134d3b00",
    "f861a9d8-bb73-4521-34a7-c81e58292000",
    "056a8be7-ccbb-4e12-c619-0ad3383e3700",
    "e0255140-26de-422c-bbae-4095e94d4000",
    "a2774258-e696-4426-c695-9c9c8eefa400",
    "6c82d69a-d541-4236-0bcc-5aaafe5f2600",
    "2dec6203-b8c0-449a-0d9c-ba11ba90aa00",
    "a5a6c0b6-96fd-418c-00b8-561b466c4900",
    "9d4d312b-8032-41a3-7f43-df42bb417400",
    "cac240f6-ecdb-49da-22e0-672b3e1f2d00",
    "0915319c-57e7-474c-d2d2-f08e85e10d00",
    "4331e98d-7fb0-40be-ba05-3ec52d56b100",
    "6fd3ab07-6666-46a8-eb9e-73039eb78100",
    "10f5a074-349d-4784-0627-df8face83d00",
    "9609629b-53d3-4f04-d03b-da34938b9000",
    "15502193-e923-4f11-f5c2-63714959ff00",
    "0d39b8e3-01ee-4843-94e7-32ca7da5ac00",
    "54c726f4-f910-4180-948e-0a8d1d3a1400",
    "450389ad-7c6a-4c38-ff92-a545cc9c0500",
    "13b5b812-239a-448b-9eb3-beff81ab1200",
    "feec01c5-0f81-496a-517c-0da23143d800",
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
                  ARCHITECTURE PHOTOGRAPHY
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architecture Grid - Minimal top padding */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArchitectureGrid images={architectureImages} />
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

export default ArchitecturePage;
