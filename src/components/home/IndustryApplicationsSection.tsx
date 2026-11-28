"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface IndustryApp {
  title_ar: string;
  title_en: string;
  desc: string;
  image: string;
  materials: string[];
  categorySlug: string;
}

const industries: IndustryApp[] = [
  {
    title_ar: "مستحضرات العناية بالبشرة",
    title_en: "Skin Care Formulations",
    desc: "خامات سيروم الهيالورونيك، كريمات الترطيب الفائق، لوشن الجسم، ومقشرات الأحماض.",
    image: "/images/home/skincare-formulations.jpg",
    materials: ["حمض الهيالورونيك", "نياسيناميد B3", "فيتامين E", "أيزوبروبيل ميرستات (IPM)"],
    categorySlug: "raw-powders-and-actives",
  },
  {
    title_ar: "منتجات العناية بالشعر والمعالجات",
    title_en: "Hair Care & Treatments",
    desc: "مواد تصنيع شامبوهات خالية من السلفات، حمامات كريم، بلسمات بروتين، وسيروم السيليكون.",
    image: "/images/home/haircare-treatments.jpg",
    materials: ["سلسلة سيليكونات 350/1501", "زيت أرجان مغربي", "BTMS50/80", "بانثينول B5"],
    categorySlug: "chemical-liquids-and-solvents",
  },
  {
    title_ar: "المستحضرات الطبية التجميلية",
    title_en: "Cosmeceuticals & Derma",
    desc: "خامات متخصصة لمعامل التركيبات والمستحضرات الموجهة لعيادات الجلدية والصيدليات.",
    image: "/images/home/vitamins-nutrients.jpg",
    materials: ["سالسيلك أسيد نقي", "يوريا تجميلية", "كوجيك أسيد", "زنك بيريثيون"],
    categorySlug: "raw-powders-and-actives",
  },
  {
    title_ar: "الصابون والمنظفات ومستحضرات النظافة",
    title_en: "Soaps, Detergents & Home Care",
    desc: "مواد فعالة سطحياً، عوامل رغوة فائقة الثبات، وقواعد الصابون الطبي والصلب والسائل.",
    image: "/images/home/liquids-solvents.jpg",
    materials: ["تكسابون جل وبودر", "سلفونيك نقي", "جلسرين USP", "حمض الشمع"],
    categorySlug: "chemical-liquids-and-solvents",
  },
  {
    title_ar: "العطور الفاخرة ومعطرات الجو",
    title_en: "Fine Fragrances & Sprays",
    desc: "زيوت عطرية فرنسية وشرقية مركزة خالية من الكحول ومثبتات عطرية صناعية.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    materials: ["زيوت عطرية بيور", "داي بروبلين جليكول (DPG)", "مسك رمان حليبي", "بدائل براندات عالمية"],
    categorySlug: "fragrances-and-scents",
  },
];

export default function IndustryApplicationsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="industries">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 text-navy-900 border border-navy-100 text-xs font-bold mb-4">
            <span>القطاعات والصناعات المخدومة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight mb-4">
            خامات مخصصة لخطوط الإنتاج والتصنيع
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            نوفر حلول توريد متكاملة تناسب مواصفات واشتراطات كل قطاع صناعي وتجميلي بأعلى درجات النقاء والثبات.
          </p>
        </div>

        {/* 5 Balanced Photographic Industry Cards (3 + 2 on Desktop) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between ${
                i < 3 ? "lg:col-span-2" : i === 3 ? "lg:col-span-3" : "md:col-span-2 lg:col-span-3"
              }`}
            >
              <div>
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={ind.image}
                    alt={ind.title_ar}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 text-white">
                    <p className="text-[10px] font-mono text-sky-300 uppercase tracking-wider mb-0.5">
                      {ind.title_en}
                    </p>
                    <h3 className="text-lg font-bold">{ind.title_ar}</h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {ind.desc}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-slate-100 mb-2">
                    <p className="text-[11px] font-bold text-slate-700 mb-2">أبرز الخامات الموردة:</p>
                    {ind.materials.map((mat, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/shop?category=${ind.categorySlug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 group-hover:text-navy-950 transition-colors"
                >
                  <span>استكشاف خامات القطاع</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
