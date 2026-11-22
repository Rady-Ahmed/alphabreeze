"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Sparkles,
  FlaskConical,
  Atom,
  Flame,
  Palette,
  Heart,
  Apple,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";

const pillars = [
  {
    slug: "oils-and-extracts",
    name_ar: "الزيوت والمستخلصات النباتية",
    name_en: "Oils & Botanical Extracts",
    count: 82,
    icon: Droplets,
    color: "from-emerald-500 to-teal-700",
    bgLight: "bg-emerald-50/70",
    borderHover: "hover:border-emerald-300",
    description: "زيوت طبيعية وعطرية وناقلة نقية، خلاصات عشبية مائية وزيتية لمستحضرات الشعر والبشرة.",
    samples: ["زيت أرجان", "زيت لوز حلو/مر", "شجرة الشاي", "زيت جوجوبا", "خلاصة ألوفيرا", "خلاصة روزماري"],
  },
  {
    slug: "raw-powders-and-actives",
    name_ar: "البودرات والمواد الفعالة",
    name_en: "Raw Powders & Active Ingredients",
    count: 81,
    icon: Sparkles,
    color: "from-sky-500 to-blue-700",
    bgLight: "bg-sky-50/70",
    borderHover: "hover:border-sky-300",
    description: "مكونات فعالة فائقة النقاء، أحماض تقشير، بوليمرات تغليظ، مستحلبات، ومضادات أكسدة.",
    samples: ["سالسيلك أسيد", "كربابول 940", "حمض الشمع", "زنك بيريثيون", "كوجيك أسيد", "BTMS50/80"],
  },
  {
    slug: "chemical-liquids-and-solvents",
    name_ar: "السوائل الكيميائية والمذيبات والسيليكون",
    name_en: "Chemical Liquids, Solvents & Silicones",
    count: 59,
    icon: FlaskConical,
    color: "from-blue-600 to-indigo-800",
    bgLight: "bg-blue-50/70",
    borderHover: "hover:border-blue-300",
    description: "مذيبات نقية، عوامل ترطيب واستحلاب، زيوت برافين، وسلسلة سيليكونات تجميلية وصناعية متعددة اللزوجات.",
    samples: ["جلسرين نقي", "سيليكون 350/1501", "فينوكسي إيثانول", "CCT زيتي", "توين 20/80", "داي بروبلين جليكول"],
  },
  {
    slug: "vitamins-and-nutrients",
    name_ar: "الفيتامينات والأحماض الأمينية والمغذيات",
    name_en: "Vitamins, Amino Acids & Nutrients",
    count: 29,
    icon: Atom,
    color: "from-violet-500 to-purple-800",
    bgLight: "bg-violet-50/70",
    borderHover: "hover:border-violet-300",
    description: "مغذيات حيوية وأحماض أمينية بتركيزات صيدلانية لتغذية بصيلات الشعر وتجديد خلايا البشرة.",
    samples: ["نياسيناميد B3", "بانثينول B5", "فيتامين E", "هالورونيك أسيد", "L-Cysteine", "فيتامين C (MAP)"],
  },
  {
    slug: "waxes-and-polymers",
    name_ar: "الشموع والبوليمرات التجميلية",
    name_en: "Waxes & Cosmetic Polymers",
    count: 5,
    icon: Flame,
    color: "from-amber-500 to-orange-700",
    bgLight: "bg-amber-50/70",
    borderHover: "hover:border-amber-300",
    description: "شموع استحلاب وتثبيت قوام، شموع طبيعية ونفطية لتصنيع الكريمات والمراهم والبلسمات.",
    samples: ["شمع استحلاب EWAX", "شمع عسل طبيعي", "شمع كرنوبا أصفر فاخر", "شمع برافين", "شمع ميكروكريستالين"],
  },
  {
    slug: "colors-and-pigments",
    name_ar: "الألوان والأصباغ والمايكا التجميلية",
    name_en: "Colors, Pigments & Micas",
    count: 83,
    icon: Palette,
    color: "from-rose-500 to-pink-700",
    bgLight: "bg-rose-50/70",
    borderHover: "hover:border-rose-300",
    description: "ألوان زيتية ومائية، بودرات مايكا برّاقة، أكاسيد معدنية، وأصباغ مصرح بها لمستحضرات التجميل والمكياج.",
    samples: ["مايكا لامعة (20 درجة)", "بيجمنت عالي التركيز", "أكاسيد معدنية", "ألوان زيتية ومائية", "عكر فاسي أصلي"],
  },
  {
    slug: "fragrances-and-scents",
    name_ar: "العطور والزيوت العطرية المركزة",
    name_en: "Fragrances & Essential Scents",
    count: 68,
    icon: Heart,
    color: "from-pink-500 to-rose-700",
    bgLight: "bg-pink-50/70",
    borderHover: "hover:border-pink-300",
    description: "زيوت عطرية فائقة الثبات والتركيز خالية من الكحول، بدائل براندات عالمية، عطور شرقية، ومستخلصات فاكهية.",
    samples: ["سوفاج", "مسك رمان حليبي", "بلاك أوبيوم", "روز فانيليا", "لافندر بيور", "عود وبخور"],
  },
  {
    slug: "flavors",
    name_ar: "النكهات الغذائية والصناعية",
    name_en: "Food & Industrial Flavors",
    count: 17,
    icon: Apple,
    color: "from-lime-600 to-green-800",
    bgLight: "bg-lime-50/70",
    borderHover: "hover:border-lime-300",
    description: "نكهات مركزة معتمدة قابلة للاستخدام في مرطبات الشفاه، معاجين الأسنان، والصناعات الغذائية والدوائية.",
    samples: ["نكهات كامينا زيتية", "فراولة", "توت", "فانيليا", "شوكولاتة", "كراميل وبندق"],
  },
];

export default function CatalogPillarsSection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="catalog-pillars">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold mb-4">
            <span>الكتالوج الصناعي المعتمد لشركة ألفا بريز</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            الأقسام الكيميائية الثمانية الرئيسية
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            استكشف أكثر من 430 مادة خام مصنفة وفق المعايير العالمية لصناعة مستحضرات التجميل، المنظفات، والصناعات الدوائية في مصر.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={`/shop?category=${pillar.slug}`}
                  className={`group flex flex-col h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${pillar.borderHover}`}
                >
                  {/* Top: Icon + Count */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-navy-950 group-hover:text-white transition-colors font-mono">
                      {pillar.count} مادة
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-navy-950 mb-1 group-hover:text-sky-600 transition-colors">
                    {pillar.name_ar}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
                    {pillar.name_en}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                    {pillar.description}
                  </p>

                  {/* Sample Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-4">
                    {pillar.samples.slice(0, 4).map((sample, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                      >
                        {sample}
                      </span>
                    ))}
                  </div>

                  {/* Link CTA */}
                  <div className="flex items-center justify-between text-xs font-bold text-sky-600 pt-2 border-t border-slate-50 group-hover:text-sky-700">
                    <span>استعراض المواد المسجلة</span>
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Global Shop Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 hover:text-sky-600 transition-colors underline underline-offset-8">
              عرض الكتالوج الكامل بجميع الفلاتر والبحث المتقدم (+430 منتج)
              <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
