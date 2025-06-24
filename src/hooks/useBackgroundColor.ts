import { useEffect, useState } from "react";

interface BackgroundSection {
  element: string;
  color: string;
  threshold?: number;
}

export const useBackgroundColor = (sections: BackgroundSection[]) => {
  const [currentBackground, setCurrentBackground] = useState("#000000");

  useEffect(() => {
    const updateBackgroundColor = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find the current section based on scroll position
      for (const section of sections) {
        const element = document.querySelector(section.element);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollY + rect.top;
          const elementBottom = elementTop + rect.height;
          const threshold = section.threshold || 0.3; // 30% of viewport by default

          // Check if we're in this section (with threshold)
          if (
            scrollY >= elementTop - windowHeight * threshold &&
            scrollY < elementBottom - windowHeight * threshold
          ) {
            if (currentBackground !== section.color) {
              setCurrentBackground(section.color);
              // Update the actual body background
              document.body.style.backgroundColor = section.color;
              document.documentElement.style.backgroundColor = section.color;
            }
            break;
          }
        }
      }
    };

    // Initial check
    updateBackgroundColor();

    // Add scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateBackgroundColor();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBackgroundColor);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBackgroundColor);
    };
  }, [sections, currentBackground]);

  return currentBackground;
};
