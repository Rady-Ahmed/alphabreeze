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
    image: "/images/raw-materials-supply.jpg",
    link: "/shop?category=oils-and-extracts",
  },
  {
    title: "البودرات والمواد الفعالة",
    subtitle: "81 مادة بنقاء صيدلاني",
    image: "/images/home/powders-actives.jpg",
    link: "/shop?category=raw-powders-and-actives",
  },
  {
    title: "السوائل والمذيبات والسيليكون",
    subtitle: "59 مادة لخطوط الإنتاج",
    image: "/images/home/liquids-solvents.jpg",
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
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none z-[1]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-[1]"
      />

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
              className="mb-4 p-1.5 bg-white/10 backdrop-blur-xl border border-sky-400/25 focus-within:border-sky-400/70 focus-within:shadow-[0_0_30px_rgba(56,189,248,0.22)] rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-xl mx-auto transition-all duration-300"
            >
              <div className="relative flex-1 flex items-center pr-3">
                <Search className="w-4 h-4 text-sky-300 ml-2.5 shrink-0" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن مادة خام (مثال: أرجان، سالسيلك، كربابول)..."
                  className="bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm h-11"
                />
              </div>
              <Button
                type="submit"
                className="bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-white font-bold h-11 px-6 rounded-xl shadow-md text-xs shrink-0 transition-all"
              >
                بحث في الكتالوج
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              </Button>
            </form>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8 text-[11px]">
              <span className="text-slate-400 font-medium">الأكثر طلباً:</span>
              {["هيالورونيك أسيد", "نياسيناميد", "زيت أرجان", "BTMS-50"].map((tag) => (
                <Link
                  key={tag}
                  href={`/shop?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-sky-200 transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-navy-950 hover:bg-sky-50 active:scale-[0.98] font-black h-12 px-7 rounded-xl shadow-lg hover:shadow-sky-500/20 text-xs sm:text-sm transition-all"
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
                  className="border-sky-400/40 text-sky-200 hover:bg-white/10 active:scale-[0.98] font-bold h-12 px-6 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 ml-2 text-sky-400" />
                  طلب عرض سعر (RFQ)
                </Button>
              </a>
            </div>

            {/* 3. Visual Gallery Cards Under Text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
              {heroImageCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    href={card.link}
                    className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/15 shadow-xl block hover:border-sky-400/60 hover:shadow-sky-500/15 transition-all duration-300"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-transparent" />
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                    <div className="absolute bottom-3 right-3 left-3 text-right">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                        {card.subtitle}
                      </p>
                    </div>
                  </Link>
                </motion.div>
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
