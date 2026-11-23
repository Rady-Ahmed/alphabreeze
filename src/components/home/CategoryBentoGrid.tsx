"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Droplets, FlaskConical, Atom, Palette, Heart, Apple, Flame } from "lucide-react";

interface BentoCategory {
  slug: string;
  name_ar: string;
  name_en: string;
  count: number;
  description: string;
  image: string;
  colSpan: string; // Tailwind class
  accent: string;
  tag: string;
}

const bentoCategories: BentoCategory[] = [
  {
    slug: "oils-and-extracts",
    name_ar: "الزيوت والمستخلصات النباتية",
    name_en: "Oils & Botanical Extracts",
    count: 82,
    description: "زيوت طبيعية وعطرية وناقلة نقية، خلاصات عشبية مائية وزيتية للشعر والبشرة.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-2 lg:row-span-2",
    accent: "from-emerald-950/90 via-emerald-900/60 to-transparent",
    tag: "الأكثر طلباً لمصانع الشعر",
  },
  {
    slug: "raw-powders-and-actives",
    name_ar: "البودرات والمواد الفعالة",
    name_en: "Raw Powders & Active Ingredients",
    count: 81,
    description: "مكونات فعالة فائقة النقاء، أحماض تقشير، بوليمرات تغليظ، ومستحلبات تجميلية.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-2 lg:row-span-1",
    accent: "from-sky-950/90 via-sky-900/60 to-transparent",
    tag: "نقاء صيدلاني USP",
  },
  {
    slug: "colors-and-pigments",
    name_ar: "الألوان والأصباغ والمايكا",
    name_en: "Colors, Pigments & Micas",
    count: 83,
    description: "بودرات مايكا برّاقة، أكاسيد معدنية، وألوان زيتية ومائية معتمدة.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-pink-950/90 via-pink-900/60 to-transparent",
    tag: "83 لون ومايكا",
  },
  {
    slug: "fragrances-and-scents",
    name_ar: "العطور والزيوت المركزة",
    name_en: "Fragrances & Essential Scents",
    count: 68,
    description: "زيوت عطرية خالية من الكحول فائقة الثبات وبدائل براندات عالمية.",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-purple-950/90 via-purple-900/60 to-transparent",
    tag: "ثبات وتركيز فائق",
  },
  {
    slug: "chemical-liquids-and-solvents",
    name_ar: "السوائل والمذيبات والسيليكون",
    name_en: "Chemical Liquids & Silicones",
    count: 59,
    description: "مذيبات نقية، عوامل ترطيب، وسلسلة سيليكونات متخصصة متعددة اللزوجات.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-blue-950/90 via-blue-900/60 to-transparent",
    tag: "براميل وأطنان",
  },
  {
    slug: "vitamins-and-nutrients",
    name_ar: "الفيتامينات والمغذيات",
    name_en: "Vitamins & Nutrients",
    count: 29,
    description: "نياسيناميد، بانثينول، فيتامين E، وأحماض الهيالورونيك المركزة.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-violet-950/90 via-violet-900/60 to-transparent",
    tag: "تغذية وترميم",
  },
  {
    slug: "flavors",
    name_ar: "النكهات الغذائية والصناعية",
    name_en: "Flavors & Essences",
    count: 17,
    description: "نكهات زيتية معتمدة قابلة للاستخدام في مرطبات الشفاه والمنتجات الدوائية.",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-amber-950/90 via-amber-900/60 to-transparent",
    tag: "معتمدة صحياً",
  },
  {
    slug: "waxes-and-polymers",
    name_ar: "الشموع والبوليمرات التجميلية",
    name_en: "Waxes & Polymers",
    count: 5,
    description: "شمع استحلاب EWAX، شمع عسل طبيعي، شمع كرنوبا أصفر، وبرافين.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
    accent: "from-orange-950/90 via-orange-900/60 to-transparent",
    tag: "تثبيت القوام",
  },
];

export default function CategoryBentoGrid() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="categories">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>الكتالوج الصناعي المعتمد B2B</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              أقسام المواد الخام الرئيسية
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              استكشف أكثر من 430 مادة خام كيميائية وتجميلية مصنفة بدقة وفق المعايير العالمية لتلبية خطوط إنتاجكم.
            </p>
          </div>

          <Link href="/shop" className="shrink-0">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-navy-950 transition-colors">
              <span>استعراض كافة الخامات (+430 مادة)</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[220px]">
          {bentoCategories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`group relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 ${cat.colSpan}`}
            >
              <Link href={`/shop?category=${cat.slug}`} className="block h-full w-full">
                {/* Background Image with subtle zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name_ar}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Gradient Overlay for text contrast */}
                <div
                  className={`absolute inset-0 z-[1] bg-gradient-to-t ${cat.accent} transition-opacity duration-300`}
                />

                {/* Additional Ambient Hover Glow */}
                <div className="absolute inset-0 z-[2] bg-navy-950/20 group-hover:bg-navy-950/40 transition-colors duration-300" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between text-white">
                  {/* Top Bar: Badge & Counter */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white shadow-sm">
                      {cat.tag}
                    </span>
                    <span className="text-xs font-black font-mono px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-sky-300 border border-sky-400/30">
                      {cat.count} مادة
                    </span>
                  </div>

                  {/* Bottom Text & Action Arrow */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1 group-hover:text-sky-200 transition-colors">
                      {cat.name_ar}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-300 mb-2 uppercase tracking-wider">
                      {cat.name_en}
                    </p>
                    <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed mb-3">
                      {cat.description}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 group-hover:text-white transition-colors">
                      <span>عرض المواد المتاحة</span>
                      <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                    </div>
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
