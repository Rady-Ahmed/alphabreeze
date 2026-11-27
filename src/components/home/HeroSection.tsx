"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Sparkles,
  Search,
  FileText,
  PhoneCall,
  CheckCircle2,
  Droplets,
  Layers,
} from "lucide-react";

const heroImageCards = [
  {
    title: "الزيوت والمستخلصات",
    subtitle: "82 مادة طبيعية ونقية",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=oils-and-extracts",
  },
  {
    title: "البودرات والمواد الفعالة",
    subtitle: "81 مادة بنقاء صيدلاني",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=raw-powders-and-actives",
  },
  {
    title: "السوائل والمذيبات والسيليكون",
    subtitle: "59 مادة لخطوط الإنتاج",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=chemical-liquids-and-solvents",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden bg-navy-950 text-white">
      {/* 1. Underlying Cinematic Laboratory Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
          alt="مختبر كيميائي وصناعي"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90"
        />
      </div>

      {/* 2. Atmospheric Soft Cyan Mist & Deep Blue Layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 14, 42, 0.95) 0%, rgba(15, 22, 66, 0.85) 60%, rgba(10, 14, 42, 0.98) 100%)",
        }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-[1]" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-12 lg:pt-36">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-sky-400/30 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-sky-200">
                توريد المواد الخام لمصانع ومعامل التجميل B2B
              </span>
            </div>

            {/* Crisp, Spacious Headline (No Letter Overlapping) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-5 text-white leading-tight">
              توريد المواد الخام الكيميائية{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-200 block sm:inline mt-1 sm:mt-0">
                لمستحضرات التجميل
              </span>
            </h1>

            {/* Short 1-Line Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              أكثر من 430 مادة خام معتمدة بشهادات التحليل المخبري (COA) وصحائف الأمان (MSDS) مع شحن مباشر للمصانع.
            </p>

            {/* Clean Compact Search Input */}
            <form
              onSubmit={handleSearch}
              className="mb-8 p-1.5 bg-white/10 backdrop-blur-xl border border-sky-400/25 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
            >
              <div className="relative flex-1 flex items-center pr-3">
                <Search className="w-4 h-4 text-sky-300 ml-2.5 shrink-0" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن مادة خام (مثال: أرجان، سالسيلك، كربابول)..."
                  className="bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm h-10"
                />
              </div>
              <Button
                type="submit"
                className="bg-sky-500 hover:bg-sky-400 text-white font-bold h-10 px-5 rounded-xl shadow-md text-xs shrink-0"
              >
                بحث في الكتالوج
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              </Button>
            </form>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-navy-950 hover:bg-sky-50 font-black h-12 px-7 rounded-xl shadow-lg text-xs sm:text-sm"
                >
                  استكشف المنتجات (+430 مادة)
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/201019946409?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-400/40 text-sky-200 hover:bg-white/10 font-bold h-12 px-6 rounded-xl text-xs sm:text-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 ml-2 text-sky-400" />
                  طلب عرض سعر (RFQ)
                </Button>
              </a>
            </div>

            {/* 3. Visual Gallery Cards Under Text (إضافة صور واضحة تحت الكلام) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4">
              {heroImageCards.map((card, i) => (
                <Link
                  key={i}
                  href={card.link}
                  className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/15 shadow-xl block hover:border-sky-400/60 transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 text-right">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </motion.div>

        </div>
      </div>

      {/* Clean Organic Curve Divider */}
      <div className="relative w-full overflow-hidden leading-none z-[2]">
        <svg
          className="relative block w-full h-8 sm:h-10 text-slate-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C200,80 400,-20 600,40 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
