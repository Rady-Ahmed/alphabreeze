"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface BentoCategory {
  slug: string;
  name_ar: string;
  name_en: string;
  count: number;
  image: string;
  colSpan: string;
  accent: string;
}

const bentoCategories: BentoCategory[] = [
  {
    slug: "oils-and-extracts",
    name_ar: "الزيوت والمستخلصات النباتية",
    name_en: "Oils & Botanical Extracts",
    count: 82,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-2 lg:row-span-2",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "raw-powders-and-actives",
    name_ar: "البودرات والمواد الفعالة",
    name_en: "Raw Powders & Actives",
    count: 81,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-2 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "colors-and-pigments",
    name_ar: "الألوان والأصباغ والمايكا",
    name_en: "Colors & Micas",
    count: 83,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "fragrances-and-scents",
    name_ar: "العطور والزيوت المركزة",
    name_en: "Fragrances & Scents",
    count: 68,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "chemical-liquids-and-solvents",
    name_ar: "السوائل والمذيبات والسيليكون",
    name_en: "Chemical Liquids & Solvents",
    count: 59,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "vitamins-and-nutrients",
    name_ar: "الفيتامينات والمغذيات",
    name_en: "Vitamins & Nutrients",
    count: 29,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "flavors",
    name_ar: "النكهات الغذائية والصناعية",
    name_en: "Flavors & Essences",
    count: 17,
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
  {
    slug: "waxes-and-polymers",
    name_ar: "الشموع والبوليمرات",
    name_en: "Waxes & Polymers",
    count: 5,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-navy-950/90 via-navy-950/40 to-transparent",
  },
];

export default function CategoryBentoGrid() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="categories">
      <div className="container mx-auto px-4">
        
        {/* Crisp Header - Minimal Words */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>أقسام الكتالوج المعتمد</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight">
              أقسام المواد الخام
            </h2>
          </div>

          <Link href="/shop" className="shrink-0">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-600 hover:text-navy-950 transition-colors">
              <span>عرض كافة الخامات (+430 مادة)</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Clean Bento Grid - Image Focused & Spacious */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {bentoCategories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className={`group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 ${cat.colSpan}`}
            >
              <Link href={`/shop?category=${cat.slug}`} className="block h-full w-full">
                {/* Full Background Photography */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name_ar}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Soft Bottom Gradient for Text Readability */}
                <div
                  className={`absolute inset-0 z-[1] bg-gradient-to-t ${cat.accent}`}
                />

                {/* Top Badge: Count only */}
                <div className="relative z-10 p-5 flex items-start justify-between">
                  <span className="text-xs font-black font-mono px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-sky-300 border border-sky-400/30">
                    {cat.count} مادة
                  </span>
                </div>

                {/* Bottom Content: Clean & Uncluttered */}
                <div className="absolute bottom-0 right-0 left-0 z-10 p-5 text-white">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 group-hover:text-sky-300 transition-colors leading-snug">
                    {cat.name_ar}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                      {cat.name_en}
                    </p>
                    <ArrowLeft className="w-4 h-4 text-sky-300 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
