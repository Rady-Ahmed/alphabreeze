import HeroSection from "@/components/home/HeroSection";
import TrustCapabilityStrip from "@/components/home/TrustCapabilityStrip";
import CategoryBentoGrid from "@/components/home/CategoryBentoGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IndustryApplicationsSection from "@/components/home/IndustryApplicationsSection";
import TechnicalAssuranceSection from "@/components/home/TechnicalAssuranceSection";
import PrivateLabelSection from "@/components/home/PrivateLabelSection";
import ProcurementJourneySection from "@/components/home/ProcurementJourneySection";
import ArticlesSection from "@/components/home/ArticlesSection";
import FAQSection from "@/components/home/FAQSection";
import FinalConversionSection from "@/components/home/FinalConversionSection";

export const metadata = {
  title: "ألفا بريز للكيماويات | توريد المواد الخام ومكونات مستحضرات التجميل الصناعية B2B",
  description:
    "الشريك المعتمد لمصانع ومعامل مستحضرات التجميل في مصر. توريد أكثر من 430 مادة خام معتمدة (زيوت، مستخلصات، بودرات فعالة، مذيبات، وعطور مركزة) مع شهادات التحليل COA و MSDS وخدمات التصنيع للغير.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero with Visual Cards Under Text */}
      <HeroSection />

      {/* 2. Minimalist Trust & Capability Strip */}
      <TrustCapabilityStrip />

      {/* 3. Art-Directed Bento Grid of the 8 Categories */}
      <CategoryBentoGrid />

      {/* 4. Live Catalog Explorer & Quick Quote (RFQ) */}
      <FeaturedProducts />

      {/* 5. Industry Sectors & Applications with Photography */}
      <IndustryApplicationsSection />

      {/* 6. Quality, Standards & Laboratory Assurance (COA/MSDS) */}
      <TechnicalAssuranceSection />

      {/* 7. Turnkey Private Label (Visual Split Layout) */}
      <PrivateLabelSection />

      {/* 8. Supply Journey Workflow (5 Clear Connected Stages) */}
      <ProcurementJourneySection />

      {/* 9. Formulation & Technical Insights (Editorial Articles) */}
      <ArticlesSection />

      {/* 10. Accessible FAQ Accordion */}
      <FAQSection />

      {/* 11. Final Closing Conversion CTA */}
      <FinalConversionSection />
    </>
  );
}
