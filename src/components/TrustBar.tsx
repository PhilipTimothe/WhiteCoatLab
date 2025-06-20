import React from "react";
import { motion } from "framer-motion";

interface TrustBarProps {
  backgroundColor?: string;
  textColor?: string;
}

const TrustBar: React.FC<TrustBarProps> = ({
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  const clientLogos = [
    {
      name: "Darby",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/622e9739-3af1-4af1-36ae-3651c07be400/public",
      sizeMultiplier: 0.95,
      spacing: "2rem",
    },
    {
      name: "Cutler & Gross",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/84a6d75a-7bc1-46c4-432e-595355961500/public",
      sizeMultiplier: 3.0,
      spacing: "2.5rem",
    },
    {
      name: "MCU",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/99aeefcf-3cdb-413a-1231-192fa6d94400/public",
      sizeMultiplier: 0.65,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
    {
      name: "Notion",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/7cad141a-2552-4744-cee6-bae407b2c900/public",
      sizeMultiplier: 0.85,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
    {
      name: "Atlassian",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/bd7d56c4-1a0b-47cb-0536-79218667ba00/public",
      sizeMultiplier: 1.15,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
    {
      name: "WTHN",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/2fff2bc5-b52f-481f-4caf-a900dd3aab00/public",
      sizeMultiplier: 1.15,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
    {
      name: "Tend",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/66960064-4da2-4066-3128-f7e4dbebe100/public",
      sizeMultiplier: 0.75,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
    {
      name: "Glowbar",
      src: "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/e9a37d27-9281-4cbf-ddf1-56ae7b203b00/public",
      sizeMultiplier: 1.55,
      spacing: "clamp(3rem, 6vw, 5rem)",
    },
  ];

  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div
              className="w-10 h-px"
              style={{
                backgroundColor:
                  textColor === "#000000" ? "#cccccc" : "#666666",
              }}
            />
            <span
              className="text-xs tracking-widest font-medium uppercase"
              style={{ color: textColor === "#000000" ? "#666666" : "#9CA3AF" }}
            >
              SEEN THROUGH OUR LENS
            </span>
            <div
              className="w-10 h-px"
              style={{
                backgroundColor:
                  textColor === "#000000" ? "#cccccc" : "#666666",
              }}
            />
          </div>
          <p
            className="text-sm sm:text-base mt-4 max-w-2xl mx-auto"
            style={{ color: textColor === "#000000" ? "#666666" : "#9CA3AF" }}
          >
            These brands represent the exceptional spaces we've had the
            privilege to capture — through direct commissions and collaborations
            with construction and brand teams.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 w-20 sm:w-32 h-full z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 w-20 sm:w-32 h-full z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
            }}
          />

          <div className="overflow-hidden whitespace-nowrap relative">
            <motion.div
              className="flex animate-marquee"
              style={{ width: "300%" }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: `${120 * logo.sizeMultiplier}px`,
                    marginRight: logo.spacing,
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    style={{
                      width: `${120 * logo.sizeMultiplier}px`,
                      height: `${60 * logo.sizeMultiplier}px`,
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
