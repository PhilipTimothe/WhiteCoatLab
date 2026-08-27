import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";
import CaseStudy from "../components/CaseStudy";

const glowbarTreatments = [
  { name: "LED Light Therapy", id: "36084d36-7aeb-4b66-2ca4-57679b05d000" },
  { name: "Hydrating Masks", id: "5b4ab2a2-169b-4ced-495d-f8c4dcdebb00" },
  { name: "Cavitation", id: "bbe6415b-8918-4a3a-d0ef-8ef403fc1500" },
  { name: "High Frequency", id: "a22c0b0c-1749-4df7-c6d6-e5ee03602400" },
  { name: "Chemical Peels", id: "35ecc675-ebc3-4e66-5c39-ba310d20fa00" },
  { name: "Dermaplaning", id: "d8face78-752c-4fdf-663f-7094beac7e00" },
  { name: "Extractions", id: "d16dbaa9-c3e6-4a1c-928c-2bd241643100" },
  { name: "Microcurrent", id: "c33068be-90a0-4970-ac6a-8b8c3a713e00" },
  { name: "Lymphatic Drainage", id: "6eb17146-77b1-4a4f-a905-17e264a82200" },
  { name: "Cryo Globes", id: "1353cebb-b542-42f8-a1f9-d55d21771f00" },
].map((treatment) => ({
  label: treatment.name,
  src: `https://imagedelivery.net/vIFjcBZ0mNLvqHHWqyidpw/${treatment.id}/public`,
}));

const archive = [
  {
    name: "PORTRAITS",
    href: "/portraits",
    image:
      "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/25350851-f816-46bb-6ca6-ffc944e6e900/public",
  },
  {
    name: "ARCHITECTURE",
    href: "/architecture",
    image:
      "https://imagedelivery.net/ly47schtw9lMeXBIbG9ODw/e38fe85f-72b2-45a1-51f3-e80fa057e100/public",
  },
  {
    name: "VISUAL STORIES",
    href: "/visual-stories",
    image:
      "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const WorkPage = () => {
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
                  WORK
                </span>
                <div className="w-10 h-px bg-gray-600"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8">
          <CaseStudy
            client="Darby"
            logo="/darbylogo.png"
            headline="The function Darby didn't have."
            stats={["2-year program", "29 projects", "14+ active sites"]}
            situation="Darby was building steadily, and every new project created the same recurring need: digital assets, images of the work, ready to use. What they didn't have was a dependable source for it. No dedicated go-to. The need was real, it kept coming, and it was being met ad hoc or not at all."
            call="A vendor waits to be told what to make. From early on, the ideas came from our side of the table. Content marketing itself was something we brought to Darby, not something they handed us. As the relationship grew, that widened into bigger conversations, how their website could be revamped, how their content could actually work, and the early pieces we made helped shape the content marketing team they went on to build in-house. We were setting direction, not waiting for it."
            work="For each new build, we produced the digital image assets it called for. Done consistently, project after project, that turned into more than a run of separate shoots. It became a delivery pipeline they could count on, the same standard every time. The consistency was the product as much as any single image."
            outcome="There was no single turning point. It compounded. Each project fed the same reliable pipeline until it was simply one ongoing program: two years, 29 projects, across more than fourteen active sites. Darby kept coming back because the direction and the delivery were both dependable. The proof isn't a highlight reel. It's the longevity."
          />
        </section>

        {/* Case Studies: Glowbar */}
        <section className="pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <CaseStudy
            client="Glowbar"
            logo="/GlowbarLogo.png"
            headline="The shoot was never the problem."
            stats={["10 treatments", "2 projects", "one visual system"]}
            situation="Glowbar is a skincare brand with studios in Hoboken and NYC. They needed marketing content for a broad set of treatments, each one communicating its value, fitting the brand, and deploying fast across the channels where customers browse and book. The treatments were a mixed set, device-based, manual, and product-based, and left alone they would photograph as a patchwork. The real problem was never the camera. It was making a diverse range of treatments read as one coherent brand, which is a marketing question, not a photo shoot."
            call="A photographer starts with the shoot. We started with the objective. Before any production began, we defined how each asset would actually be used, mapped every deliverable to that use case, and set a single visual standard, the same framing, styling, and lighting, that every treatment would follow regardless of its type. That standard was the real deliverable. It is what let a device-based treatment and a manual one sit side by side and still read as the same brand. From there we ran execution against deadlines, managed the review and revision loop, and protected the work from scope creep."
            work="Seven treatments in the first project, produced as one consistent, approved, launch-ready library. When Glowbar came back for three more, with different models and a separate shoot, the new assets had to slot into the existing library with no visible seam. The same process and the same standard made them indistinguishable from the originals, so the library stayed coherent as it grew to ten."
            images={glowbarTreatments}
            outcome="The imagery is live on Glowbar's core Skincare Services page today, the treatment library customers browse and book from. Ten distinct treatments across multiple models hold one visual system, so the brand reads the same no matter which treatment a customer opens. The clearest proof isn't in the images, though. It's that Glowbar came back for a second project. Reliability on the first is why the second one existed."
          />
        </section>

        {/* Case Studies: Catch Up with Teddy */}
        <section className="pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <CaseStudy
            client="Catch Up with Teddy"
            logo="/catchupwithteddylogo.png"
            headline="It looks like a catch-up. It's a system."
            stats={["Repeatable format", "Sustainable cadence", "Built to scale"]}
            situation="Teddy is an artist trying to build an audience from the ground up, without the reach, the budget, or the machine that established names lean on. The instinct in that spot is to chase a viral moment or spend on high production. Neither one builds a lasting audience. What was actually missing was presence: showing up consistently, in a voice people recognize, often enough to earn trust. That is not a filming problem. It is a marketing problem, how do you manufacture familiarity at scale when you are starting from nothing."
            call="We didn't start by making videos. We started by designing a format. Discovery skipped traditional market research and instead studied how successful short-form creators actually hold an audience: presence, consistency, and a conversational tone over polish. Out of that came Catch Up with Teddy, a repeatable series with defined format rules, pacing, and a consistent frame and tone, treated like product iterations rather than one-off posts. The real deliverable was the system, not any single episode. Once the format is set, presence becomes something you produce on purpose instead of hoping it happens."
            work="We ran the whole thing, the product side and the content side. On the product side, format design, success criteria, and the system itself. On the content side, creative direction, filming, editing, and packaging across episodes. Underneath both, a lightweight filming and publishing workflow built for a cadence one person could actually sustain, so consistency didn't depend on budget or motivation. Every episode had to stand on its own and still add to a familiar, building relationship."
            videoId="fedcb70753f1eeb68ccc33554c9cea14"
            outcome="The series laid the foundation it was built for: a repeatable short-form format, steadier audience touchpoints, and clear engagement signals to iterate on. More than any single number, it produced a system that keeps producing, one that can scale with Teddy or adapt to another artist entirely. The lesson underneath it is the whole studio thesis in miniature. It looks casual, but the presence is engineered, and consistency built trust faster than polish ever could."
          />
        </section>

        {/* Visual Archive */}
        <section className="pt-2 pb-20 sm:pt-3 sm:pb-24 md:pt-4 md:pb-32 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs tracking-widest font-medium text-gray-400">
                THE ARCHIVE
              </span>
              <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                The craft behind the direction, up close.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {archive.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group relative block aspect-[4/5] overflow-hidden bg-gray-900"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  <span className="absolute bottom-6 left-6 text-sm tracking-widest font-medium text-white">
                    {item.name}
                  </span>
                </Link>
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

export default WorkPage;
