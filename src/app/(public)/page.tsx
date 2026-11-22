import HeroSection from "@/components/home/HeroSection";
import CatalogPillarsSection from "@/components/home/CatalogPillarsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import QualityComplianceSection from "@/components/home/QualityComplianceSection";
import PrivateLabelSection from "@/components/home/PrivateLabelSection";
import ProcurementWorkflowSection from "@/components/home/ProcurementWorkflowSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import AboutSection from "@/components/home/AboutSection";
import PartnersSection from "@/components/home/PartnersSection";
import ArticlesSection from "@/components/home/ArticlesSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import ContactSection from "@/components/home/ContactSection";
import MapSection from "@/components/home/MapSection";

export const metadata = {
  title: "ألفا بريز للكيماويات | توريد المواد الخام ومكونات مستحضرات التجميل الصناعية B2B",
  description:
    "الشريك المعتمد لمصانع ومعامل مستحضرات التجميل في مصر. توريد أكثر من 430 مادة خام معتمدة (زيوت، مستخلصات، بودرات فعالة، مذيبات، عطور مركزة) مع شهادات التحليل COA و MSDS وخدمات التصنيع للغير.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Executive B2B Hero with Live Search & Fast Category Launchers */}
      <HeroSection />

      {/* 2. The 8 Core Chemical Catalog Pillars (424 items categorized) */}
      <CatalogPillarsSection />

      {/* 3. Live Full B2B Catalog Explorer & Request for Quote (RFQ) */}
      <FeaturedProducts />

      {/* 4. Industrial Application Sectors (Skin, Hair, Pharma, Soaps, Perfumes) */}
      <IndustrySectorsSection />

      {/* 5. Quality, Compliance & Laboratory Testing Standards (COA, MSDS, USP) */}
      <QualityComplianceSection />

      {/* 6. Turnkey Contract Manufacturing & Private Label Suite */}
      <PrivateLabelSection />

      {/* 7. Corporate Procurement Workflow for Factories (4 clear stages) */}
      <ProcurementWorkflowSection />

      {/* 8. Industrial Competitive Advantages (Stability, Pricing, Technical R&D) */}
      <WhyChooseUsSection />

      {/* 9. Corporate About & Verified Supply Metrics */}
      <AboutSection />

      {/* 10. International Sourcing & Approved Global Chemical Origins */}
      <PartnersSection />

      {/* 11. Technical Formulation & Chemical Industry Insights */}
      <ArticlesSection />

      {/* 12. B2B Technical Procurement FAQ */}
      <FAQSection />

      {/* 13. Executive Final Call to Action */}
      <CTASection />

      {/* 14. Contact Form & Regional Headquarters */}
      <ContactSection />

      {/* 15. Geographic Headquarters Location */}
      <MapSection />
    </>
  );
}
