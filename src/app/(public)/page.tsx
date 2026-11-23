import HeroSection from "@/components/home/HeroSection";
import TrustCapabilityStrip from "@/components/home/TrustCapabilityStrip";
import CategoryBentoGrid from "@/components/home/CategoryBentoGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IndustryApplicationsSection from "@/components/home/IndustryApplicationsSection";
import TechnicalAssuranceSection from "@/components/home/TechnicalAssuranceSection";
import PrivateLabelSection from "@/components/home/PrivateLabelSection";
import ProcurementJourneySection from "@/components/home/ProcurementJourneySection";
import WhyAlphaBreezeSection from "@/components/home/WhyAlphaBreezeSection";
import ArticlesSection from "@/components/home/ArticlesSection";
import FAQSection from "@/components/home/FAQSection";
import FinalConversionSection from "@/components/home/FinalConversionSection";

export const metadata = {
  title: "ألفا بريز للكيماويات | توريد المواد الخام ومكونات مستحضرات التجميل الصناعية B2B",
  description:
    "الشريك المعتمد لمصانع ومعامل مستحضرات التجميل في مصر. توريد أكثر من 430 مادة خام معتمدة (زيوت نقية، خلاصات، بودرات فعالة، مذيبات، وعطور مركزة) مع شهادات التحليل COA و MSDS وخدمات التصنيع للغير.",
};

export default function HomePage() {
  return (
    <>
      {/* B. Cinematic Hero — The Signature Experience */}
      <HeroSection />

      {/* C. Trust & Capability Strip */}
      <TrustCapabilityStrip />

      {/* D. Product Categories — Premium Bento Layout */}
      <CategoryBentoGrid />

      {/* E. Product Catalog Preview & Request a Quote (RFQ) */}
      <FeaturedProducts />

      {/* F. Industry Applications (Skin Care, Hair Care, Cosmetics, Soaps, Fragrances) */}
      <IndustryApplicationsSection />

      {/* G. Quality & Technical Assurance (COA, MSDS, USP/BP, Lab Samples) */}
      <TechnicalAssuranceSection />

      {/* H. Private Label & Industrial Solutions (Split Layout) */}
      <PrivateLabelSection />

      {/* I. How We Work (01 Discover to 05 Supply & Delivery) */}
      <ProcurementJourneySection />

      {/* J. Why Alpha Breeze (Range, Support, Sourcing, Flexibility) */}
      <WhyAlphaBreezeSection />

      {/* K. Articles & Technical Insights (Editorial Cards) */}
      <ArticlesSection />

      {/* L. FAQ (Accessible Accordion) */}
      <FAQSection />

      {/* M. Final Conversion Section ("Let's Supply Your Next Production Line") */}
      <FinalConversionSection />
    </>
  );
}
