import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import VisionMission from "@/components/about/VisionMission";
import StatsSection from "@/components/about/StatsSection";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على ألفا بريز - الشريك الرائد في صناعة مستحضرات التجميل والخامات في مصر",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <VisionMission />
      <StatsSection />
    </>
  );
}
